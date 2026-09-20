import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../services/db';
import { PersonalNote, FastingTrackerState } from '../types';
import { 
  Calendar, 
  HeartHandshake, 
  FileText, 
  Image as ImageIcon, 
  Bell, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Pin, 
  AlertCircle,
  MapPin,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const MoreView: React.FC = () => {
  const { t } = useLanguage();
  const [subTab, setSubTab] = useState<'calendar' | 'fasting' | 'notes' | 'gallery' | 'reminders' | 'backup'>('calendar');

  const festivalDays = db.getFestivalDays();
  const [notes, setNotes] = useState<PersonalNote[]>(() => db.getNotes());
  const [fastingState, setFastingState] = useState<FastingTrackerState>(() => db.getFastingState());
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const [selectedPhoto, setSelectedPhoto] = useState<{ title: string; category: string; url: string } | null>(null);

  const [galleryImages, setGalleryImages] = useState<{ id: string; title: string; category: string; url: string }[]>([
    { id: '1', title: 'संध्या अर्घ्य (पहिला अरग)', category: 'Sandhya Arghya', url: '/gallery/sandhya_arghya.jpg' },
    { id: '2', title: 'उषा अर्घ्य (भोरवा अरग)', category: 'Usha Arghya', url: '/gallery/usha_arghya.jpg' },
    { id: '3', title: 'बांस का पावन दउरा व ईख', category: 'Chhath Daura', url: '/gallery/chhath_daura.jpg' },
    { id: '4', title: 'बांस का सूप व पूजन फल', category: 'Pavitra Soop', url: '/gallery/pavitra_soop.jpg' },
    { id: '5', title: 'पवित्र ठेकुआ महाप्रसाद', category: 'Thekua Prasad', url: '/gallery/thekua_prasad.jpg' },
    { id: '6', title: 'घाट पर कोसी भरना (दीपमाला)', category: 'Kosi Bharai', url: '/gallery/kosi_bharai.jpg' },
    { id: '7', title: 'खरना रसियाव-रोटी महाप्रसाद', category: 'Kharna Prasad', url: '/gallery/kharna_prasad.jpg' },
    { id: '8', title: 'नहाय-खाय कद्दू-भात', category: 'Nahay Khay', url: '/gallery/nahay_khay.jpg' }
  ]);

  // Handle Note Save
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const updated = db.saveNote({
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      isPinned: false,
      isFavorite: false
    });
    setNotes(updated);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleDeleteNote = (id: string) => {
    const updated = db.deleteNote(id);
    setNotes(updated);
  };

  // Fasting Tracker Toggle
  const toggleFasting = () => {
    const nextState: FastingTrackerState = {
      ...fastingState,
      isFastingActive: !fastingState.isFastingActive,
      startedAt: !fastingState.isFastingActive ? new Date().toISOString() : null
    };
    setFastingState(nextState);
    db.saveFastingState(nextState);
  };

  const toggleParana = () => {
    const nextState: FastingTrackerState = {
      ...fastingState,
      paranaDone: !fastingState.paranaDone
    };
    setFastingState(nextState);
    db.saveFastingState(nextState);
  };

  // Backup & Restore
  const handleExportBackup = () => {
    const jsonStr = db.exportBackupJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chhath_parv_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert('बैकअप फ़ाइल सफलतापूर्वक डाउनलोड हो गई!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && db.importBackupJson(content)) {
        alert('बैकअप सफलता से पुनर्स्थापित (Restore) हो गया! ऐप रीफ्रेश हो रहा है...');
        window.location.reload();
      } else {
        alert('अमान्य बैकअप फ़ाइल। कृपया सही फ़ाइल चुनें।');
      }
    };
    reader.readAsText(file);
  };

  // Add Photo to Gallery
  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newPic = {
      id: 'photo-' + Date.now(),
      title: file.name.replace(/\.[^/.]+$/, ''),
      category: 'Family',
      url
    };
    setGalleryImages([newPic, ...galleryImages]);
    alert('फोटो गैलरी में जोड़ दी गई!');
  };

  return (
    <div className="space-y-5 pb-24">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold font-devanagari text-stone-900 dark:text-white">
          अन्य सुविधाएं एवं सेटिंग्स
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          कैलेंडर, व्रत ट्रैकर, व्यक्तिगत नोट्स, फोटो गैलरी व बैकअप
        </p>
      </div>

      {/* Sub-Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1 rounded-2xl bg-amber-100/60 dark:bg-slate-900 border border-amber-200/50 dark:border-slate-800 text-xs">
        {[
          { id: 'calendar', label: 'कैलेंडर', icon: Calendar },
          { id: 'fasting', label: 'व्रत ट्रैकर', icon: HeartHandshake },
          { id: 'notes', label: 'नोट्स', icon: FileText },
          { id: 'gallery', label: 'गैलरी', icon: ImageIcon },
          { id: 'reminders', label: 'रिमाइंडर', icon: Bell },
          { id: 'backup', label: 'बैकअप', icon: Download },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = subTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSubTab(item.id as any)}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                isActive
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-600 dark:text-stone-300'
              }`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span className="text-[11px] truncate w-full text-center">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-Tab 1: Calendar */}
      {subTab === 'calendar' && (
        <div className="space-y-3">
          <div className="rounded-2xl bg-amber-500/10 border border-amber-400/30 p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-200 font-semibold">
              <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>स्थान: पटना, बिहार (IST)</span>
            </div>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              वर्ष 2026 पंचांग
            </span>
          </div>

          <div className="space-y-3">
            {festivalDays.map((day) => (
              <div
                key={day.id}
                className="rounded-3xl bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800 p-4 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-800 pb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[11px] font-bold">
                    दिवस {day.dayNumber}
                  </span>
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    {day.dayOfWeek} • {day.date}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-stone-900 dark:text-white font-devanagari">
                  {day.titleHindi} ({day.ritualName})
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {day.meaning}
                </p>
                <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                  {day.timingNotice}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-stone-400 text-center italic">
            * स्थानीय सूर्यास्त व सूर्योदय के समय के लिए स्थानीय दैनिक पंचांग का अवलोकन करें।
          </p>
        </div>
      )}

      {/* Sub-Tab 2: Fasting Tracker */}
      {subTab === 'fasting' && (
        <div className="space-y-4">
          <div className="rounded-3xl bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-stone-900 dark:text-white font-devanagari flex items-center">
              <HeartHandshake className="w-5 h-5 mr-2 text-amber-500" />
              छठ व्रत एवं नियम ट्रैकर
            </h3>

            {/* Fasting Toggle Button */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-white font-devanagari">
                  {fastingState.isFastingActive ? 'उपवास प्रारंभ है (Fasting Active)' : 'उपवास अभी शुरू नहीं हुआ'}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {fastingState.startedAt 
                    ? `प्रारंभ समय: ${new Date(fastingState.startedAt).toLocaleString()}` 
                    : 'खरना के संध्या प्रसाद के बाद 36 घंटे का निर्जला व्रत'}
                </p>
              </div>

              <button
                onClick={toggleFasting}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                  fastingState.isFastingActive
                    ? 'bg-red-500 text-white'
                    : 'bg-amber-500 text-stone-950'
                }`}
              >
                {fastingState.isFastingActive ? 'उपवास रोकें' : 'उपवास शुरू करें'}
              </button>
            </div>

            {/* Parana Checkbox */}
            <div 
              onClick={toggleParana}
              className="p-3.5 rounded-2xl border border-stone-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-amber-400"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2 className={`w-5 h-5 ${fastingState.paranaDone ? 'text-green-500 fill-green-500/20' : 'text-stone-300'}`} />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white">
                    उषा अर्घ्य के बाद पारण संपन्न हुआ (Parana Done)
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    अदरक, गुड़ व कच्चा दूध या जल ग्रहण कर व्रत पूर्ण किया
                  </p>
                </div>
              </div>
              <span className={`text-xs font-bold ${fastingState.paranaDone ? 'text-green-600' : 'text-stone-400'}`}>
                {fastingState.paranaDone ? 'संपन्न' : 'अपूर्ण'}
              </span>
            </div>

            {/* Health Safety Warning */}
            <div className="rounded-2xl bg-amber-500/10 border border-amber-400/30 p-3.5 text-xs text-amber-900 dark:text-amber-200 leading-relaxed flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p>{t('disclaimerHealthcare')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Personal Notes */}
      {subTab === 'notes' && (
        <div className="space-y-4">
          
          {/* Create Note Form */}
          <form onSubmit={handleSaveNote} className="rounded-3xl bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800 p-4 shadow-sm space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              नया व्यक्तिगत नोट जोड़ें
            </h3>
            <input
              type="text"
              placeholder="शीर्षक (जैसे: पिछले वर्ष का घाट स्थान व तैयारी)..."
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
            <textarea
              rows={2}
              placeholder="विवरण लिखें..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold flex items-center space-x-1 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>नोट सहेजें</span>
            </button>
          </form>

          {/* Notes List */}
          <div className="space-y-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-2xl bg-white dark:bg-[#131927] border border-amber-200/50 dark:border-slate-800 p-4 shadow-sm space-y-1.5 relative group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white font-devanagari flex items-center">
                    {note.isPinned && <Pin className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />}
                    {note.title}
                  </h4>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-devanagari whitespace-pre-wrap">
                  {note.content}
                </p>
                <div className="text-[10px] text-stone-400 pt-1">
                  अंतिम अपडेट: {new Date(note.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Photo Gallery */}
      {subTab === 'gallery' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-700 dark:text-stone-300 font-devanagari">
              छठ महापर्व पावन झांकी व स्मृतियां
            </h3>

            <label className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold shadow cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>फोटो जोड़ें</span>
              <input type="file" accept="image/*" onChange={handleAddPhoto} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {galleryImages.map((img) => (
              <div 
                key={img.id}
                onClick={() => setSelectedPhoto(img)}
                className="rounded-2xl overflow-hidden bg-white dark:bg-[#131927] border border-amber-200/50 dark:border-slate-800 shadow-sm group cursor-pointer hover:border-amber-400 transition-all hover:shadow-md"
              >
                <div className="aspect-square bg-amber-950/40 p-2 flex items-center justify-center overflow-hidden">
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 rounded-xl" 
                  />
                </div>
                <div className="p-2.5">
                  <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                    {img.category}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white truncate font-devanagari mt-0.5">
                    {img.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Photo Lightbox Modal */}
          {selectedPhoto && (
            <div 
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <div 
                className="bg-stone-900 border border-amber-400/40 rounded-3xl p-4 max-w-sm w-full space-y-3 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-square rounded-2xl bg-black/40 flex items-center justify-center overflow-hidden border border-white/10">
                  <img 
                    src={selectedPhoto.url} 
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      {selectedPhoto.category}
                    </span>
                    <h3 className="text-base font-bold text-white font-devanagari">
                      {selectedPhoto.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                  >
                    बंद करें ✕
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 5: Reminders */}
      {subTab === 'reminders' && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-stone-700 dark:text-stone-300 font-devanagari">
            महत्वपूर्ण अनुष्ठान रिमाइंडर (Reminders)
          </h3>

          <div className="space-y-2">
            {[
              { title: 'नहाय-खाय की सामग्री व्यवस्था', time: '13 नवंबर (शुक्रवार) • सायं 06:00' },
              { title: 'खरना प्रसाद की तैयारी (रसियाव-रोटी)', time: '14 नवंबर (शनिवार) • सायं 04:30' },
              { title: 'ठेकुआ व सूप सजावट', time: '15 नवंबर (रविवार) • प्रातः 11:00' },
              { title: 'संध्या घाट प्रस्थान (पहिला अरग)', time: '15 नवंबर (रविवार) • अपराह्न 03:00' },
              { title: 'उषा अर्घ्य हेतु जागरण एवं घाट प्रस्थान', time: '16 नवंबर (सोमवार) • भोर 03:30' },
            ].map((rem, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white font-devanagari">
                      {rem.title}
                    </h4>
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                      {rem.time}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold">
                  सक्रिय
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 6: Backup & Restore */}
      {subTab === 'backup' && (
        <div className="space-y-4">
          <div className="rounded-3xl bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-stone-900 dark:text-white font-devanagari flex items-center">
              <Download className="w-5 h-5 mr-2 text-amber-500" />
              स्थानीय बैकअप एवं पुनर्स्थापना (Offline JSON Backup)
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              आपकी चेकलिस्ट, व्यक्तिगत नोट्स, पारिवारिक कार्य और सेटिंग्स पूरी तरह आपके डिवाइस पर सुरक्षित रहती हैं। आवश्यकता पड़ने पर आप इन्हें सुरक्षित बैकअप फ़ाइल में डाउनलोड या पुनः लोड कर सकते हैं।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleExportBackup}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold shadow active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>बैकअप डाउनलोड करें (Export)</span>
              </button>

              <label className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-bold border border-stone-200 dark:border-slate-700 cursor-pointer shadow active:scale-95 transition-all">
                <Upload className="w-4 h-4 text-amber-500" />
                <span>बैकअप लोड करें (Import)</span>
                <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
