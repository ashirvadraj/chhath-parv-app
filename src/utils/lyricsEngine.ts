// Sacred Chhath Puja Lyrics Engine & Real-Time Sync Provider
// Provides live synced lines, dynamic word-by-word timing, and seek points

export interface SyncedWord {
  text: string;
  startTime: number;
  endTime: number;
}

export interface SyncedLine {
  id: string;
  lineIndex: number;
  text: string;
  startTime: number;
  endTime: number;
  words: SyncedWord[];
  isVerseBreak?: boolean;
}

export interface LyricsTimeline {
  songId: string;
  lines: SyncedLine[];
  totalDuration: number;
}

/**
 * Parses song lyrics into a synchronized timeline of lines and word intervals.
 * Supports exact LRC timestamps [mm:ss.xx] as well as proportional distribution.
 */
export function parseLyricsToTimeline(
  songId: string,
  lyrics: string,
  totalDuration: number
): LyricsTimeline {
  if (!lyrics || !lyrics.trim()) {
    return { songId, lines: [], totalDuration };
  }

  const rawLines = lyrics.split('\n');
  const duration = Math.max(45, totalDuration || 280);
  const timestampRegex = /^\[(\d{1,2}):(\d{2}(?:\.\d+)?)\]\s*(.*)$/;
  const hasTimestamps = rawLines.some(l => timestampRegex.test(l.trim()));

  // 1. EXACT TIMESTAMP PARSING (LRC Mode)
  if (hasTimestamps) {
    const parsedCues: { startTime: number; text: string; isVerseBreak: boolean }[] = [];
    let lastWasEmpty = false;

    for (let i = 0; i < rawLines.length; i++) {
      const trimmed = rawLines[i].trim();
      if (!trimmed) {
        lastWasEmpty = true;
        continue;
      }

      const m = trimmed.match(timestampRegex);
      if (m) {
        const mins = parseInt(m[1], 10);
        const secs = parseFloat(m[2]);
        const startTime = mins * 60 + secs;
        const text = m[3].trim();
        if (text) {
          parsedCues.push({ startTime, text, isVerseBreak: lastWasEmpty });
          lastWasEmpty = false;
        }
      }
    }

    if (parsedCues.length > 0) {
      const lines: SyncedLine[] = [];

      for (let i = 0; i < parsedCues.length; i++) {
        const cue = parsedCues[i];
        const nextStartTime = i < parsedCues.length - 1 ? parsedCues[i + 1].startTime : duration;
        const rawLineDur = Math.max(1.0, nextStartTime - cue.startTime);

        // Word parsing & timing within the line
        const wordsRaw = cue.text.split(/\s+/).filter(Boolean);
        // Active singing window inside the line (avoids stretching words across long instrumental pauses)
        const estSingingWindow = Math.max(2.0, wordsRaw.length * 0.48);
        const activeSingingEnd = rawLineDur > 8 && rawLineDur > estSingingWindow * 1.8
          ? cue.startTime + Math.min(rawLineDur - 1.0, Math.max(estSingingWindow, 5.0))
          : nextStartTime;

        const wordWeights = wordsRaw.map(w => Math.max(1, w.replace(/[,!?;:…\-–—।॥]/g, '').length));
        const totalWordWeight = wordWeights.reduce((acc, c) => acc + c, 0) || 1;

        let wordStart = cue.startTime;
        const words: SyncedWord[] = [];

        for (let w = 0; w < wordsRaw.length; w++) {
          const fraction = wordWeights[w] / totalWordWeight;
          const wDuration = (activeSingingEnd - cue.startTime) * fraction;
          const wEnd = w === wordsRaw.length - 1 ? activeSingingEnd : wordStart + wDuration;

          words.push({
            text: wordsRaw[w],
            startTime: wordStart,
            endTime: wEnd
          });

          wordStart = wEnd;
        }

        lines.push({
          id: `${songId}-lrc-${i}`,
          lineIndex: i,
          text: cue.text,
          startTime: cue.startTime,
          endTime: nextStartTime, // line stays in view until next line starts
          words,
          isVerseBreak: cue.isVerseBreak || (i > 0 && cue.startTime - parsedCues[i - 1].startTime > 7)
        });
      }

      return {
        songId,
        lines,
        totalDuration: duration
      };
    }
  }

  // 2. PROPORTIONAL FALLBACK (Non-LRC Mode)
  const validLines: { text: string; isVerseBreak: boolean }[] = [];
  let lastWasEmpty = false;
  for (let i = 0; i < rawLines.length; i++) {
    const trimmed = rawLines[i].trim();
    if (!trimmed) {
      lastWasEmpty = true;
    } else {
      validLines.push({ text: trimmed, isVerseBreak: lastWasEmpty });
      lastWasEmpty = false;
    }
  }

  if (validLines.length === 0) {
    return { songId, lines: [], totalDuration };
  }

  // Duration allocation (intro & outro padding for realistic folk song cadence)
  const introTime = Math.min(12, Math.max(5, duration * 0.04));
  const outroTime = Math.min(16, Math.max(8, duration * 0.05));
  const singingTime = Math.max(20, duration - introTime - outroTime);

  // Compute proportional weights for lines based on character density and stanza pauses
  const weights = validLines.map(line => {
    const cleanChars = line.text.replace(/[\s.,!?;:…\-–—।॥]/g, '').length;
    return Math.max(4, cleanChars) + (line.isVerseBreak ? 4 : 0);
  });
  const totalWeight = weights.reduce((acc, w) => acc + w, 0);

  let currentStart = introTime;
  const lines: SyncedLine[] = [];

  for (let i = 0; i < validLines.length; i++) {
    const lineObj = validLines[i];
    const lineWeight = weights[i];
    const lineDuration = Math.max(2.2, (lineWeight / totalWeight) * singingTime);
    const lineEnd = i === validLines.length - 1 ? duration - outroTime : currentStart + lineDuration;

    // Word parsing & timing within the line
    const wordsRaw = lineObj.text.split(/\s+/).filter(Boolean);
    const wordWeights = wordsRaw.map(w => Math.max(1, w.replace(/[,!?;:…\-–—।॥]/g, '').length));
    const totalWordWeight = wordWeights.reduce((acc, c) => acc + c, 0) || 1;

    let wordStart = currentStart;
    const words: SyncedWord[] = [];

    for (let w = 0; w < wordsRaw.length; w++) {
      const fraction = wordWeights[w] / totalWordWeight;
      const wDuration = (lineEnd - currentStart) * fraction;
      const wEnd = w === wordsRaw.length - 1 ? lineEnd : wordStart + wDuration;

      words.push({
        text: wordsRaw[w],
        startTime: wordStart,
        endTime: wEnd
      });

      wordStart = wEnd;
    }

    lines.push({
      id: `${songId}-l-${i}`,
      lineIndex: i,
      text: lineObj.text,
      startTime: currentStart,
      endTime: lineEnd,
      words,
      isVerseBreak: lineObj.isVerseBreak
    });

    currentStart = lineEnd;
  }

  return {
    songId,
    lines,
    totalDuration: duration
  };
}

/**
 * Finds the currently active line index given the playback currentTime.
 */
export function getActiveLineIndex(lines: SyncedLine[], currentTime: number): number {
  if (!lines || lines.length === 0) return -1;

  if (currentTime < lines[0].startTime) {
    return 0; // Prelude phase
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (currentTime >= line.startTime && currentTime <= line.endTime) {
      return i;
    }
  }

  if (currentTime > lines[lines.length - 1].endTime) {
    return lines.length - 1; // Outro phase
  }

  // Fallback nearest
  for (let i = 0; i < lines.length - 1; i++) {
    if (currentTime > lines[i].endTime && currentTime < lines[i + 1].startTime) {
      return i;
    }
  }

  return 0;
}

/**
 * Helper to determine word status for karaoke bold highlighting.
 */
export function getWordPlaybackState(
  word: SyncedWord,
  currentTime: number
): 'sung' | 'singing' | 'upcoming' {
  if (currentTime >= word.endTime) {
    return 'sung';
  }
  if (currentTime >= word.startTime && currentTime < word.endTime) {
    return 'singing';
  }
  return 'upcoming';
}
