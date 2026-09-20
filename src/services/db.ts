import { 
  UserSettings, 
  FestivalDay, 
  Song, 
  ChecklistItem, 
  FamilyTask, 
  MantraItem, 
  PersonalNote, 
  FastingTrackerState
} from '../types';
import { FULL_SONG_LYRICS } from './fullSongLyrics';

const STORAGE_KEYS = {
  SETTINGS: 'chhath_parv_settings',
  FESTIVAL: 'chhath_parv_festival',
  DAYS: 'chhath_parv_days',
  GUIDES: 'chhath_parv_guides',
  SONGS: 'chhath_parv_songs',
  CHECKLIST: 'chhath_parv_checklist',
  FAMILY_TASKS: 'chhath_parv_family_tasks',
  MANTRAS: 'chhath_parv_mantras',
  NOTES: 'chhath_parv_notes',
  FAVORITES: 'chhath_parv_favorites',
  FASTING: 'chhath_parv_fasting',
};

// Initial Default Settings
export const DEFAULT_SETTINGS: UserSettings = {
  language: 'hi',
  theme: 'dark',
  notificationsEnabled: true,
  selectedYear: 2026,
  locationCity: 'पटना (Patna)',
  largeFont: false,
  autoScrollLyrics: true,
};

// Initial Festival Day Records for Chhath Puja 2026
export const INITIAL_DAYS: FestivalDay[] = [
  {
    id: 'day-1',
    festivalId: 'chhath-2026',
    dayNumber: 1,
    key: 'nahay_khay',
    title: 'Nahay Khay',
    titleHindi: 'नहाय-खाय',
    titleBhojpuri: 'नहाय-खाय (संयम व शुद्धि)',
    date: '2026-11-13',
    dayOfWeek: 'शुक्रवार (Friday)',
    ritualName: 'आत्म-शुद्धि एवं घर की पवित्रता',
    tagline: 'पवित्रता, शुद्धि और सात्विक संकल्प का प्रथम दिवस',
    meaning: 'नहाय-खाय का अर्थ है स्नान करके सात्विक भोजन ग्रहण करना। यह चार दिवसीय महापर्व की शुरुआत और शारीरिक व मानसिक शुद्धि का संकल्प है।',
    description: 'व्रती नदी, तालाब या घर पर पवित्र गंगाजल मिश्रित जल से स्नान कर सूर्य देव को प्रणाम करते हैं। पूरे घर की गहन सफाई की जाती है और केवल शुद्ध कांसे या मिट्टी के बर्तनों में भोजन पकाया जाता है।',
    importantActivities: [
      'नदी या पवित्र जलाशय में स्नान, अथवा गंगाजल डालकर स्नान',
      'घर एवं पूजा स्थान की पूर्ण सफाई व पवित्रता',
      'सेंधा नमक, चने की दाल, कद्दू (लौकी) और अरवा चावल का सात्विक भोजन',
      'व्रती द्वारा सर्वप्रथम भोजन ग्रहण, तत्पश्चात परिवार जनों द्वारा प्रसाद ग्रहण',
      'माटी के चूल्हे एवं आम की लकड़ी की व्यवस्था'
    ],
    precautions: [
      'लहसुन, प्याज और तामसिक भोजन का पूर्ण निषेध',
      'केवल शुद्ध घी या सरसों के तेल का उपयोग',
      'रसोई में जूठे बर्तनों का प्रवेश वर्जित'
    ],
    traditionalPrasad: ['कद्दू-भात (लौकी की सब्जी)', 'चने की दाल', 'अरवा चावल', 'धनिया की चटनी (बिना लहसुन)'],
    suggestedSongKeywords: ['काँच ही बाँस', 'पहिले पहिल', 'उग हे सुरुज देव'],
    checklistCategory: 'nahay_khay',
    timingNotice: 'नहाय-खाय के दिन प्रातः काल शुद्ध स्नान के उपरांत दोपहर 12 बजे तक सात्विक भोजन ग्रहण किया जाता है।'
  },
  {
    id: 'day-2',
    festivalId: 'chhath-2026',
    dayNumber: 2,
    key: 'kharna',
    title: 'Kharna / Lohanda',
    titleHindi: 'खरना (लोहंडा)',
    titleBhojpuri: 'खरना (रसियाव-रोटी)',
    date: '2026-11-14',
    dayOfWeek: 'शनिवार (Saturday)',
    ritualName: 'संध्या पूजन एवं निर्जला व्रत आरंभ',
    tagline: 'दिनभर निर्जला उपवास और संध्या काल में गुड़ की खीर का महाप्रसाद',
    meaning: 'खरना का अर्थ है अंतःकरण की शुद्धि। इस दिन से व्रती का 36 घंटे का कठिन निर्जला व्रत प्रारंभ होता है।',
    description: 'व्रती पूरे दिन बिना जल के निर्जला उपवास रखते हैं। सूर्यास्त के बाद नए मिट्टी के चूल्हे पर आम की लकड़ी से गुड़, दूध और अरवा चावल की रसिया (खीर) तथा घी चुपड़ी रोटी बनाई जाती है।',
    importantActivities: [
      'दिनभर मौन व निर्जला उपवास',
      'शाम को मिट्टी के चूल्हे पर गुड़ की रसियाव (खीर) और रोटी तैयार करना',
      'केले के पत्ते पर सूर्य देव एवं छठी मईया को भोग लगाना',
      'एकांत में शांत मन से व्रती का प्रसाद ग्रहण',
      'परिवार एवं पड़ोसियों में महाप्रसाद वितरण'
    ],
    precautions: [
      'प्रसाद बनाते समय किसी भी प्रकार का शोर न हो',
      'व्रती के भोजन के समय पूर्ण शांति रखी जाती है',
      'प्रसाद ग्रहण के उपरांत निर्जला व्रत आरंभ होता है'
    ],
    traditionalPrasad: ['गुड़ की खीर (रसियाव)', 'घी चुपड़ी गेहूं की रोटी', 'केला', 'मूली व अदरक'],
    suggestedSongKeywords: ['केरवा जे फरेला', 'हे छठी मईया', 'रसियाव'],
    checklistCategory: 'kharna',
    timingNotice: 'खरना की पूजा सूर्यास्त के ठीक बाद गोधूलि बेला में की जाती है।'
  },
  {
    id: 'day-3',
    festivalId: 'chhath-2026',
    dayNumber: 3,
    key: 'sandhya_arghya',
    title: 'Sandhya Arghya',
    titleHindi: 'संध्या अर्घ्य (पहिला अरग)',
    titleBhojpuri: 'सँझिया अरघ (अस्ताचलगामी सूर्य)',
    date: '2026-11-15',
    dayOfWeek: 'रविवार (Sunday)',
    ritualName: 'अस्ताचलगामी सूर्य को प्रथम अर्घ्य',
    tagline: 'अस्त होते सूर्य को नमन — संसार को कृतज्ञता का अनुपम संदेश',
    meaning: 'सनातन संस्कृति का यह एकमात्र ऐसा पर्व है जहाँ डूबते हुए सूर्य को भी अर्घ्य देकर उनके उपकारों के प्रति कृतज्ञता प्रकट की जाती है।',
    description: 'दोपहर में पारंपरिक ठेकुआ और कसार तैयार किए जाते हैं। सूप और दउरा में सभी ऋतु फल सजाकर परिवार सहित गीत गाते हुए घाट की ओर प्रस्थान किया जाता है। कमर तक पानी में खड़े होकर अस्ताचलगामी सूर्य को अर्घ्य दिया जाता है।',
    importantActivities: [
      'पवित्रता पूर्वक ठेकुआ, कसार और खजूर का निर्माण',
      'बांस के सूप एवं दउरा में फल, गन्ना, सुथनी, डाभ नीम्बू सजाना',
      'सिर पर दउरा उठाकर घाट की ओर मंगल गीतों के साथ प्रस्थान',
      'नदी या तालाब के पवित्र जल में खड़े होकर सूर्य देव का ध्यान',
      'दूध एवं जल से अस्ताचलगामी सूर्य को अर्घ्य समर्पण',
      'घाट पर कोसी भरना (मन्नत वाले परिवारों द्वारा)'
    ],
    precautions: [
      'ठेकुआ केवल शुद्ध घी या सात्विक तेल में पवित्रता से बने',
      'सूप पर पैर या अशुद्ध स्पर्श कदापि न हो',
      'जल में शांत चित्त होकर सूर्य मंत्र का जप करें'
    ],
    traditionalPrasad: ['पारंपरिक ठेकुआ', 'चावल का कसार', 'ताजे मौसमी फल', 'डाभ नींबू', 'गन्ना', 'सिंघाड़ा'],
    suggestedSongKeywords: ['पटना के घटिया', 'काँच ही बाँस के बहँगिया', 'जोड़े जोड़े फलवा'],
    checklistCategory: 'sandhya_arghya',
    timingNotice: 'अर्घ्य का समय सूर्यास्त से लगभग 45 मिनट पूर्व प्रारंभ होता है। स्थानीय सूर्यास्त समय का ध्यान रखें।'
  },
  {
    id: 'day-4',
    festivalId: 'chhath-2026',
    dayNumber: 4,
    key: 'usha_arghya',
    title: 'Usha Arghya & Parana',
    titleHindi: 'उषा अर्घ्य एवं पारण (दूसरा अरग)',
    titleBhojpuri: 'भोरवा अरघ व पारन',
    date: '2026-11-16',
    dayOfWeek: 'सोमवार (Monday)',
    ritualName: 'उदीयमान सूर्य को अर्घ्य एवं व्रत पूर्णता',
    tagline: 'अरुणोदय के साथ नई ऊर्जा का स्वागत और 36 घंटे के व्रत का पारण',
    meaning: 'उषा अर्घ्य नव-जीवन, आरोग्य और आशा का प्रतीक है। इसके साथ ही लोक आस्था का यह चार दिवसीय महापर्व संपन्न होता है।',
    description: 'ब्रह्म मुहूर्त (भोर के 3:30 - 4:00 बजे) में परिवार के साथ पुनः घाट पर पहुँचा जाता है। पूर्व दिशा में लालिमा दिखते ही जल में खड़े होकर उदीयमान सूर्य को दूसरा अर्घ्य दिया जाता है। इसके पश्चात व्रती कच्चा दूध, अदरक या जल ग्रहण कर पारण करते हैं।',
    importantActivities: [
      'अमृत बेला में घाट पर दीया प्रज्ज्वलित करना',
      'उदित होते भगवान भास्कर को दूध एवं गंगाजल से अर्घ्य',
      'छठी मईया की आरती एवं क्षमा याचना',
      'घाट पर उपस्थित सभी श्रद्धालुओं को सिन्दूर टीका एवं प्रसाद वितरण',
      'घर लौटकर व्रती द्वारा पारण (उपवास खोलना) एवं बुजुर्गों का चरण स्पर्श'
    ],
    precautions: [
      'सूर्य की प्रथम किरण के दर्शन तक धैर्यपूर्वक जल में प्रतीक्षा',
      'पारण करते समय हल्का व सुपाच्य आहार लें'
    ],
    traditionalPrasad: ['छठी मईया का महाप्रसाद ठेकुआ', 'अदरक व गुड़', 'कच्चा दूध', 'अंकुरित चना'],
    suggestedSongKeywords: ['उग हे सुरुज देव', 'हो दीनानाथ', 'मारबो रे सुगवा'],
    checklistCategory: 'usha_arghya',
    timingNotice: 'सूर्योदय से पूर्व भोर 4:30 बजे से ही घाट पर एकत्र हों। सूर्य की लालिमा दिखते ही अर्घ्य दिया जाता है।'
  }
];

// Sample Checklist Items
export const INITIAL_CHECKLIST_ITEMS: ChecklistItem[] = [
  // Samagri
  { id: 'c1', checklistId: 'samagri', category: 'samagri', text: 'बांस का सूप (कम से कम 2 या 4)', isCompleted: false },
  { id: 'c2', checklistId: 'samagri', category: 'samagri', text: 'बांस का दउरा (बड़ा डलिया)', isCompleted: false },
  { id: 'c3', checklistId: 'samagri', category: 'samagri', text: 'पत्ता सहित गन्ना (ईख) - 5 या 7', isCompleted: false },
  { id: 'c4', checklistId: 'samagri', category: 'samagri', text: 'जटा वाला नारियल', isCompleted: false },
  { id: 'c5', checklistId: 'samagri', category: 'samagri', text: 'केला का घौद (पूरा गुच्छा)', isCompleted: false },
  { id: 'c6', checklistId: 'samagri', category: 'samagri', text: 'डाभ नींबू (बड़ा चकोतरा)', isCompleted: false },
  { id: 'c7', checklistId: 'samagri', category: 'samagri', text: 'गेहूं का आटा (ठेकुआ हेतु धोकर सुखाया हुआ)', isCompleted: false },
  { id: 'c8', checklistId: 'samagri', category: 'samagri', text: 'शुद्ध देसी घी', isCompleted: false },
  { id: 'c9', checklistId: 'samagri', category: 'samagri', text: 'देसी गुड़ (खरना व ठेकुआ हेतु)', isCompleted: false },
  { id: 'c10', checklistId: 'samagri', category: 'samagri', text: 'पीला सिन्दूर (छठ विशेष)', isCompleted: false },
  { id: 'c11', checklistId: 'samagri', category: 'samagri', text: 'गंगाजल (शुद्ध)', isCompleted: false },
  { id: 'c12', checklistId: 'samagri', category: 'samagri', text: 'पीतल या तांबे का कलश / लोटा', isCompleted: false },
  { id: 'c13', checklistId: 'samagri', category: 'samagri', text: 'कपूर, अगरबत्ती, धूप और माचिस', isCompleted: false },
  { id: 'c14', checklistId: 'samagri', category: 'samagri', text: 'मिट्टी के दीये (24-50 पीस) व रुई बत्ती', isCompleted: false },
  { id: 'c15', checklistId: 'samagri', category: 'samagri', text: 'हल्दी व अदरक का हरा पौधा', isCompleted: false },
  { id: 'c16', checklistId: 'samagri', category: 'samagri', text: 'सुथनी, शकरकंद (कंदा) और सिंघाड़ा', isCompleted: false },
  { id: 'c17', checklistId: 'samagri', category: 'samagri', text: 'सेब, अनार, संतरा व नाशपाती', isCompleted: false },
  { id: 'c18', checklistId: 'samagri', category: 'samagri', text: 'सुपाड़ी, पान के पत्ते और लौंग-इलायची', isCompleted: false },
  { id: 'c19', checklistId: 'samagri', category: 'samagri', text: 'लाल/पीला नया सूती वस्त्र (दउरा ढकने हेतु)', isCompleted: false },
  { id: 'c20', checklistId: 'samagri', category: 'samagri', text: 'व्रती के लिए नई साड़ी अथवा धोती', isCompleted: false },
  
  // Ghat Preparation
  { id: 'g1', checklistId: 'ghat', category: 'ghat', text: 'घाट पर जाने का मार्ग व स्थान पूर्व से सुनिश्चित', isCompleted: false },
  { id: 'g2', checklistId: 'ghat', category: 'ghat', text: 'घाट की सफाई एवं बैठने का स्थान समतल करना', isCompleted: false },
  { id: 'g3', checklistId: 'ghat', category: 'ghat', text: 'सिर पर दउरा ले जाने हेतु गमछा / पगड़ी', isCompleted: false },
  { id: 'g4', checklistId: 'ghat', category: 'ghat', text: 'सूप में सभी फल एवं ठेकुआ सजाकर व्यवस्थित रखना', isCompleted: false },
  { id: 'g5', checklistId: 'ghat', category: 'ghat', text: 'अर्घ्य हेतु गाय का कच्चा दूध बोतल में सुरक्षित रखना', isCompleted: false },
  { id: 'g6', checklistId: 'ghat', category: 'ghat', text: 'दीया जलाने हेतु तेल/घी एवं माचिस सुरक्षित पैक', isCompleted: false },
  { id: 'g7', checklistId: 'ghat', category: 'ghat', text: 'रात के समय हेतु टॉर्च / इमरजेंसी लाइट', isCompleted: false },
  { id: 'g8', checklistId: 'ghat', category: 'ghat', text: 'अर्ध्य के बाद व्रती के लिए गर्म शॉल / सूखा तौलिया', isCompleted: false },
  { id: 'g9', checklistId: 'ghat', category: 'ghat', text: 'मोबाइल फोन फुल चार्ज रखें', isCompleted: false },
  { id: 'g10', checklistId: 'ghat', category: 'ghat', text: 'पीने का पानी (परिवारजनों के लिए)', isCompleted: false },
  { id: 'g11', checklistId: 'ghat', category: 'ghat', text: 'पूजा उपरांत घाट की स्वच्छता हेतु बैग रखना', isCompleted: false }
];

// Initial Family Preparation Tasks
export const INITIAL_FAMILY_TASKS: FamilyTask[] = [
  { id: 'f1', title: 'बाजार से गन्ना, नारियल और सभी मौसमी फल लाना', assignedTo: 'परिवार (Family)', isCompleted: false, createdAt: Date.now() },
  { id: 'f2', title: 'बांस का सूप और दउरा धोकर धूप में सुखाना', assignedTo: 'माताजी / दीदी', isCompleted: false, createdAt: Date.now() },
  { id: 'f3', title: 'ठेकुआ बनाने के लिए गेहूं धोकर साफ़ कपड़े पर सुखाना', assignedTo: 'स्वयं (Me)', isCompleted: false, createdAt: Date.now() },
  { id: 'f4', title: 'मिट्टी का चूल्हा एवं आम की सुखी लकड़ियां एकत्रित करना', assignedTo: 'भाई / पिताश्री', isCompleted: false, createdAt: Date.now() },
  { id: 'f5', title: 'पूजा घर एवं रसोई की गंगाजल से धुलाई व शुद्धीकरण', assignedTo: 'सभी सदस्य', isCompleted: false, createdAt: Date.now() },
  { id: 'f6', title: 'घाट पर जाने हेतु वाहन व समय का निर्धारण करना', assignedTo: 'स्वयं (Me)', isCompleted: false, createdAt: Date.now() },
  { id: 'f7', title: 'घाट पर अर्घ्य वेदी तैयार करना व चुनरी बांधना', assignedTo: 'परिवार (Family)', isCompleted: false, createdAt: Date.now() },
  { id: 'f8', title: 'उषा अर्घ्य हेतु भोर 3:30 बजे का अलार्म लगाना', assignedTo: 'स्वयं (Me)', isCompleted: false, createdAt: Date.now() }
];

// Initial Devotional Texts
export const INITIAL_MANTRAS: MantraItem[] = [
  {
    id: 'm1',
    title: 'छठी मईया की आरती',
    titleHindi: 'जय छठी मईया आरती',
    category: 'Aarti',
    sanskrit: `जय छठी मईया, जय छठी मईया।
निज दासन के संकट, छिन में हर लीन्हा॥
सकल मनोरथ पूरण कीन्हा, विद्या बुद्धि विवेक दीन्हा।
दुःख दरिद्र सब दूर बहावत, घर आँगन सुख बरसावत॥
सूरज की प्यारी, दीनानाथ दुलारी।
कंचन थार कपूर सुहाई, आरती करत सब नर-नारी॥
जय छठी मईया, जय छठी मईया।`,
    hindiTranslation: 'हे छठी मईया आपकी सदा जय हो! आप अपने भक्तों के सभी संकटों का क्षण भर में हरण करती हैं। मन की मनोकामनाओं को पूर्ण करती हैं तथा घर-आँगन में सुख-शांति व समृद्धि की वर्षा करती हैं।',
    meaning: 'यह छठ महापर्व की प्रधान आरती है जिसे संध्या एवं उषा अर्घ्य के उपरांत पूरे श्रद्धाभाव से गाया जाता है।',
    isFavorite: true
  },
  {
    id: 'm2',
    title: 'सूर्य अर्घ्य समर्पण मंत्र',
    titleHindi: 'सूर्य अर्घ्य मंत्र',
    category: 'Arghya Mantra',
    sanskrit: `एहि सूर्य सहस्त्रांशो तेजोराशे जगत्पते।
अनुकम्पय मां भक्त्या गृहाणार्घ्यं दिवाकर॥
ॐ सूर्याय नमः, ॐ आदित्याय नमः, ॐ भास्कराय नमः॥`,
    hindiTranslation: 'हे सहस्त्र किरणों वाले तेजपुंज जगत्पिता सूर्य देव! मुझ भक्त पर अपनी कृपा दृष्टि बनाए रखते हुए मेरा यह भावपूर्ण अर्घ्य स्वीकार करें।',
    meaning: 'संध्या एवं प्रातः काल नदी जल में खड़े होकर तांबे के पात्र अथवा सूप से अर्घ्य अर्पित करते समय इस पावन मंत्र का उच्चारण किया जाता है।',
    isFavorite: true
  },
  {
    id: 'm3',
    title: 'सूर्य गायत्री मंत्र',
    titleHindi: 'सूर्य गायत्री महामंत्र',
    category: 'Surya Mantra',
    sanskrit: `ॐ आदित्याय विद्महे प्रभाकराय धीमहि।
तन्नः सूर्यः प्रचोदयात्॥`,
    hindiTranslation: 'हम उन परम तेजस्वी आदित्य का ध्यान करते हैं जो प्रभाकर हैं। वे सूर्य देव हमारी बुद्धि और चेतना को सन्मार्ग पर प्रेरित करें।',
    meaning: 'आरोग्य, तेजस्विता और दीर्घायु की प्राप्ति हेतु सूर्य गायत्री का पाठ अत्यंत फलदायी है।',
    isFavorite: false
  },
  {
    id: 'm4',
    title: 'छठ व्रत संकल्प मंत्र',
    titleHindi: 'छठ व्रत संकल्प मंत्र',
    category: 'Vrat Sankalp',
    sanskrit: `ॐ नमो भगवते सूर्यदेवाय, षष्ठी देव्यै च नमः।
मम समस्त पापक्षयपूर्वक, संतानारोग्य-दीर्घायु-सुख-समृद्धि सिद्धये
अहं श्री षष्ठी व्रत करिष्ये॥`,
    hindiTranslation: 'हे भगवान सूर्य देव और षष्ठी देवी! मेरे समस्त कष्टों का नाश हो तथा संतान के आरोग्य, दीर्घायु, कुल की समृद्धि एवं शांति हेतु मैं यह पावन छठ व्रत धारण कर रहा/रही हूँ।',
    meaning: 'नहाय-खाय के दिन स्नान के उपरांत व्रत की शुरुआत में इस पावन संकल्प को लिया जाता है।',
    isFavorite: false
  },
  {
    id: 'm5',
    title: 'सूर्य नमस्कार बारह पावन नाम',
    titleHindi: 'द्वादश सूर्य नाम',
    category: 'Surya Mantra',
    sanskrit: `ॐ मित्राय नमः। ॐ रवये नमः। ॐ सूर्याय नमः। ॐ भानवे नमः।
ॐ खगाय नमः। ॐ पूष्णे नमः। ॐ हिरण्यगर्भाय नमः। ॐ मरीचये नमः।
ॐ आदित्याय नमः। ॐ सवित्रे नमः। ॐ अर्काय नमः। ॐ भास्कराय नमः॥`,
    hindiTranslation: 'मित्र, रवि, सूर्य, भानु, खग, पूषा, हिरण्यगर्भ, मरीचि, आदित्य, सविता, अर्क और भास्कर — भगवान सूर्य के इन बारह पावन रूपों को नमन।',
    meaning: 'भगवान सूर्य के ये 12 नाम समस्त शारीरिक, मानसिक और आत्मिक विकारों को दूर करने वाले हैं।',
    isFavorite: false
  }
];

// Complete 50 Chhath Puja Songs Anthology
const RAW_SONGS: Song[] = [
  {
    "id": "song-1",
    "title": "काँच ही बाँस के बहँगिया",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "छठ महापर्व लोक धरोहर",
    "artwork": "/logo.svg",
    "duration": 328,
    "audioUrl": "audio/kaanche_hi_bansh.mp3",
    "isFavorite": true,
    "sourceNote": "छठ महापर्व का सर्वाधिक लोकप्रिय व प्रसिद्ध पारंपरिक लोकगीत"
  },
  {
    "id": "song-2",
    "title": "केरवा जे फरेला घवद से (मारबो रे सुगवा)",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "छठी मईया के वरदान",
    "artwork": "/logo.svg",
    "duration": 415,
    "audioUrl": "audio/marbo_re_sugwa.mp3",
    "isFavorite": true,
    "sourceNote": "पवित्र फल अर्पण एवं सुगवा प्रसंग का अमर लोकगीत"
  },
  {
    "id": "song-3",
    "title": "उग हे सुरुज देव भेल अरघ के बेर",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Usha Arghya",
    "album": "भोरवा अरघ विशेष",
    "artwork": "/logo.svg",
    "duration": 293,
    "audioUrl": "https://archive.org/download/ugihen-suraj-gosaiyan-hey/Ugihen-Suraj-Gosaiyan-Hey.mp3",
    "isFavorite": true,
    "sourceNote": "उदीयमान भगवान भास्कर को प्रातः अर्घ्य अर्पण गीत"
  },
  {
    "id": "song-4",
    "title": "उगs हे सूरज देव (भेल भिनसरवा)",
    "artist": "अनुराधा पौडवाल (Anuradha Paudwal)",
    "language": "Bhojpuri",
    "category": "Usha Arghya",
    "album": "छठ पूजा स्पेशल",
    "artwork": "/logo.svg",
    "duration": 352,
    "audioUrl": "audio/anuradha_uga_hai_suraj_dev.mp3",
    "isFavorite": true,
    "sourceNote": "अनुराधा पौडवाल का सुप्रसिद्ध कालजयी छठ भजन"
  },
  {
    "id": "song-5",
    "title": "पहिले पहिल हम कईनी छठी मईया व्रत तोहार",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Chhathi Maiya",
    "album": "आस्था के दीप",
    "artwork": "/logo.svg",
    "duration": 360,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Ke-Kaili-Chhath-Brath-Ke-Arag-De-Te-Jaai.mp3",
    "isFavorite": true,
    "sourceNote": "नवागंतुक व्रतियों द्वारा पहली बार छठ व्रत का संकल्प"
  },
  {
    "id": "song-6",
    "title": "पटना के घटिया पर - हो दीनानाथ",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Sandhya Arghya",
    "album": "गंगा तीरे छठ",
    "artwork": "/logo.svg",
    "duration": 414,
    "audioUrl": "https://archive.org/download/ho-deenanath/Ho-Deenanath.mp3",
    "isFavorite": true,
    "sourceNote": "गंगा किनारे अस्ताचलगामी सूर्य को अर्घ्य समर्पण"
  },
  {
    "id": "song-7",
    "title": "केलवा के पात पर उगेलन सुरुज देव",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "सुरुजमल के किरपा",
    "artwork": "/logo.svg",
    "duration": 505,
    "audioUrl": "https://archive.org/download/kelva-ke-paat-par/Kelva%20Ke%20Paat%20Par.mp3",
    "isFavorite": true,
    "sourceNote": "केले के पत्ते पर सूर्य रश्मियों का सौंदर्य"
  },
  {
    "id": "song-8",
    "title": "हो दीनानाथ (दरसन दीहीं हे दीनानाथ)",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "सूर्य वंदना अमृत",
    "artwork": "/logo.svg",
    "duration": 414,
    "audioUrl": "audio/ho_deenanath.mp3",
    "isFavorite": true,
    "sourceNote": "भगवान भास्कर से दर्शन देने की भावुक वंदना"
  },
  {
    "id": "song-9",
    "title": "पटना के घाट पर बाजे बजनवा",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मिथिला छठि पावनि",
    "artwork": "/logo.svg",
    "duration": 345,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Patna%20ke%20Ghatba.mp3",
    "isFavorite": false,
    "sourceNote": "गंगा घाट पर शहनाई व मंगल बाजों का उल्लास"
  },
  {
    "id": "song-10",
    "title": "सोने के खड़उवां हे आदितमल",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "आदित्य आराधना",
    "artwork": "/logo.svg",
    "duration": 320,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Gohre-Khadauwan-A-Aditmal.mp3",
    "isFavorite": true,
    "sourceNote": "सूर्य देव के स्वर्ण पादुका का भक्तिमय वर्णन"
  },
  {
    "id": "song-11",
    "title": "उठहु सुरुज भइले बिहान",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Usha Arghya",
    "album": "अरुणोदय गान",
    "artwork": "/logo.svg",
    "duration": 318,
    "audioUrl": "https://archive.org/download/uthau-surooj-bhaile-bihaan/Uthau%20Surooj%20Bhaile%20Bihaan.mp3",
    "isFavorite": true,
    "sourceNote": "भोर की लालिमा के साथ सूर्य देव का आवाहन"
  },
  {
    "id": "song-12",
    "title": "उगी सुरुज देव (भईल अरघ के बेर)",
    "artist": "पवन सिंह (Pawan Singh)",
    "language": "Bhojpuri",
    "category": "Usha Arghya",
    "album": "उगी सुरुज देव",
    "artwork": "/logo.svg",
    "duration": 279,
    "audioUrl": "audio/pawan_ugi_suruj_dev.mp3",
    "isFavorite": true,
    "sourceNote": "पवन सिंह का सर्वाधिक लोकप्रिय प्रातः अर्घ्य लोकगीत"
  },
  {
    "id": "song-13",
    "title": "घटवा के आरी आरी रोवेली बझिनिया",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "छठ करुणा गान",
    "artwork": "/logo.svg",
    "duration": 330,
    "audioUrl": "https://archive.org/download/ghatwa-ke-aari-aari/Ghatwa_Ke_Aari_Aari.mp3",
    "isFavorite": true,
    "sourceNote": "संतान प्राप्ति की प्रार्थना का अत्यंत मार्मिक पारंपरिक लोकगीत"
  },
  {
    "id": "song-14",
    "title": "छपरा छठ मनाएंगे (छपरा में छठ करेंगे)",
    "artist": "खेसारी लाल यादव (Khesari Lal Yadav)",
    "language": "Bhojpuri",
    "category": "Bhojpuri Chhath Geet",
    "album": "छपरा छठ मनाएंगे",
    "artwork": "/logo.svg",
    "duration": 244,
    "audioUrl": "audio/khesari_chhapra_chhat.mp3",
    "isFavorite": true,
    "sourceNote": "खेसारी लाल यादव का महापर्व पर घर लौटने का सुपरहिट गीत"
  },
  {
    "id": "song-15",
    "title": "दउरा लिहले सजाय (घाटे चलीं)",
    "artist": "मनोज तिवारी (Manoj Tiwari)",
    "language": "Bhojpuri",
    "category": "Sandhya Arghya",
    "album": "दउरा लिहले सजाय",
    "artwork": "/logo.svg",
    "duration": 311,
    "audioUrl": "audio/manoj_tiwari_daura_lihali_sajay.mp3",
    "isFavorite": true,
    "sourceNote": "मनोज तिवारी का सिर पर दउरा लेकर घाट प्रस्थान का पावन भजन"
  },
  {
    "id": "song-16",
    "title": "हे छठी मईया तोहरी महिमा अपार",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Chhathi Maiya",
    "album": "महिमा अपार",
    "artwork": "/logo.svg",
    "duration": 298,
    "audioUrl": "https://archive.org/download/hey-chhatthi-maiya/Hey-Chhatthi-Maiya.mp3",
    "isFavorite": true,
    "sourceNote": "छठी मैया की दया और कृपालु स्वरूप की स्तुति"
  },
  {
    "id": "song-17",
    "title": "हथवा में फुलवा डलइया सुरुज देव",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "प्राचीन छठ संपदा",
    "artwork": "/logo.svg",
    "duration": 330,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Hathwa-Mein-Fulwa-Dallaiya.mp3",
    "isFavorite": false,
    "sourceNote": "फूल-दलिया अर्पण एवं सूर्य देव की आराधना"
  },
  {
    "id": "song-18",
    "title": "दउरा उठाउ हे भैया घाटे चली",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मिथिला लोक संस्कृति",
    "artwork": "/logo.svg",
    "duration": 305,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Daura%20Uthawa%20Na.mp3",
    "isFavorite": false,
    "sourceNote": "भाई द्वारा दउरा उठाने का पारंपरिक मैथिली लोकगीत"
  },
  {
    "id": "song-19",
    "title": "चारि पहर हम जल थल सेविला",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "चारि पहर",
    "artwork": "/logo.svg",
    "duration": 340,
    "audioUrl": "https://archive.org/download/chaar-pahar-hum-jal-thal/Chaar%20Pahar%20Hum%20Jal%20Thal.mp3",
    "isFavorite": true,
    "sourceNote": "चारों प्रहर जल और थल में की जाने वाली साधना"
  },
  {
    "id": "song-20",
    "title": "छठी मईया अयथिन आज हमर अंगना",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मिथिला छठी आगमन",
    "artwork": "/logo.svg",
    "duration": 280,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Chatti%20Maiya.mp3",
    "isFavorite": false,
    "sourceNote": "छठी मैया के घर-आँगन में आगमन का मैथिली स्वागत गान"
  },
  {
    "id": "song-21",
    "title": "महिमा बा अगम अपार हे सुरुजमल",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "मधुर छठ धुन",
    "artwork": "/logo.svg",
    "duration": 315,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Mahima-Baa-Agam-Apaar.mp3",
    "isFavorite": true,
    "sourceNote": "सूर्य देव की अगम अपार महिमा का गुणगान"
  },
  {
    "id": "song-22",
    "title": "तोहरे आस में ठाढ़ भेलहुँ सुरुज देव",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "सँझिया अरघिया",
    "artwork": "/logo.svg",
    "duration": 285,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Tohre%20Aas%20Me.mp3",
    "isFavorite": false,
    "sourceNote": "संध्या बेला में भगवान भास्कर की प्रतीक्षा"
  },
  {
    "id": "song-23",
    "title": "छठी मईया बुलावेली घाटे",
    "artist": "पारंपरिक भोजपुरी लोकगीत",
    "language": "Bhojpuri",
    "category": "Chhathi Maiya",
    "album": "महिमा अपार",
    "artwork": "/logo.svg",
    "duration": 310,
    "audioUrl": "https://archive.org/download/chhathi-maiya-bulaye/CHHATHI%20MAIYA%20BULAYE%20.mp3",
    "isFavorite": true,
    "sourceNote": "छठी मैया का घाट पर भक्तों को स्नेहपूर्ण आमंत्रण"
  },
  {
    "id": "song-24",
    "title": "हे गंगा मईया तोहे पियरी चढ़इबो",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "गंगा मईया छठ",
    "artwork": "/logo.svg",
    "duration": 350,
    "audioUrl": "https://archive.org/download/hey-ganga-maiya/Hey%20Ganga%20Maiya.mp3",
    "isFavorite": true,
    "sourceNote": "गंगा मैया को पीली चुनरी अर्पण का अमर पारंपरिक गान"
  },
  {
    "id": "song-25",
    "title": "पेन्हले महादेव पियरिया",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "महादेव छठ गान",
    "artwork": "/logo.svg",
    "duration": 320,
    "audioUrl": "https://archive.org/download/penhle-mahadev-piyariya/Penhle%20Mahadev%20Piyariya.mp3",
    "isFavorite": true,
    "sourceNote": "महादेव के पीताम्बर धारण कर छठ घाट पधारने का रूपक"
  },
  {
    "id": "song-26",
    "title": "उगह हे सुरुज देव भेल भिनसरवा",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मिथिला प्रभात",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Ugo%20Ho%20Uraj.mp3",
    "isFavorite": false,
    "sourceNote": "मिथिला के पोखरों पर भोर में सूर्य देव का स्वागत"
  },
  {
    "id": "song-27",
    "title": "चलु चलु सखिया घाटे",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "सखी छठ समाज",
    "artwork": "/logo.svg",
    "duration": 280,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Callu%20Challu.mp3",
    "isFavorite": false,
    "sourceNote": "सखियों का समूह बनाकर घाट की ओर प्रस्थान"
  },
  {
    "id": "song-28",
    "title": "सैयां लइले दउरवा घाटे पहुँचवले",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "दउरा मंगल",
    "artwork": "/logo.svg",
    "duration": 295,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Sainya%20Laika.mp3",
    "isFavorite": false,
    "sourceNote": "दउरा उठाकर घाट पहुँचाने की आनंदमयी परंपरा"
  },
  {
    "id": "song-29",
    "title": "घाट पर नारियर फूटेला",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "पावन घाट",
    "artwork": "/logo.svg",
    "duration": 310,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Ghat%20Par%20Narial.mp3",
    "isFavorite": false,
    "sourceNote": "अर्घ्य के उपरांत घाट पर नारियल फोड़ने का मंगल दृश्य"
  },
  {
    "id": "song-30",
    "title": "दर्शन दीहीं भोरबे सुरुजमल",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "भोरबा दर्शन",
    "artwork": "/logo.svg",
    "duration": 300,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Darshan%20Dihi%20Bhore.mp3",
    "isFavorite": false,
    "sourceNote": "शीतल जल में खड़े व्रती द्वारा दर्शन की प्रार्थना"
  },
  {
    "id": "song-31",
    "title": "मईया के बरतिया पावन",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "पावन बरतिया",
    "artwork": "/logo.svg",
    "duration": 320,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Maiya%20Ke%20Brat.mp3",
    "isFavorite": false,
    "sourceNote": "छठी मैया के व्रत की पवित्रता और नियम"
  },
  {
    "id": "song-32",
    "title": "पावन छठ मंगल गान",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मंगल छठ",
    "artwork": "/logo.svg",
    "duration": 315,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Chhath%20Geet.mp3",
    "isFavorite": false,
    "sourceNote": "चार दिवसीय महापर्व के मंगल गीतों का मधुर संगम"
  },
  {
    "id": "song-33",
    "title": "काँच ही बाँस के बहँगिया (मैथिली रूप)",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मिथिला बहँगिया",
    "artwork": "/logo.svg",
    "duration": 310,
    "audioUrl": "https://archive.org/download/maithilichathsongs/kacha%20Hey%20Kee.mp3",
    "isFavorite": false,
    "sourceNote": "बहँगी प्रसंग का लोकप्रिय मैथिली पारंपरिक गायन"
  },
  {
    "id": "song-34",
    "title": "छठ पावनि पावन मिथिला",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मिथिला पावनि",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Chhaith%20Paavain.mp3",
    "isFavorite": false,
    "sourceNote": "जनक दुलारी सीता की भूमि मिथिला में छठ उत्सव"
  },
  {
    "id": "song-35",
    "title": "नारियर बाजे घाटे",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "नारियर घाट",
    "artwork": "/logo.svg",
    "duration": 285,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Narial%20Baje.mp3",
    "isFavorite": false,
    "sourceNote": "घाट पर नारियल और दीपों की मंगल छटा"
  },
  {
    "id": "song-36",
    "title": "बाँझी केवड़वा धइले ठाढ़",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "करुणा गान",
    "artwork": "/logo.svg",
    "duration": 350,
    "audioUrl": "https://archive.org/download/baanjhi-kewdwa-dhaile-thaadh/Baanjhi%20Kewdwa%20Dhaile%20Thaadh.mp3",
    "isFavorite": true,
    "sourceNote": "शारदा सिन्हा का अत्यंत प्रसिद्ध पारंपरिक छठ लोकगीत"
  },
  {
    "id": "song-37",
    "title": "चानन ताने चलले सुरुज देव",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "सूर्य प्रयाण",
    "artwork": "/logo.svg",
    "duration": 330,
    "audioUrl": "https://archive.org/download/chanani-taane-chalale/Chanani%20Taane%20Chalale.mp3",
    "isFavorite": false,
    "sourceNote": "सूर्य देव के चंदोवा तानकर चलने का सुंदर रूपक"
  },
  {
    "id": "song-38",
    "title": "जे करेला छठ बरतिया",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "बरतिया कल्याण",
    "artwork": "/logo.svg",
    "duration": 305,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Je%20Karelagu%20Chhat.mp3",
    "isFavorite": false,
    "sourceNote": "छठ व्रत करने वालों के घर में सुख-समृद्धि का गान"
  },
  {
    "id": "song-39",
    "title": "माई हे बाबूजी कहथिन छठ करब",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "परिवार छठ",
    "artwork": "/logo.svg",
    "duration": 295,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Mai%20He%20Babuji%20Kahas.mp3",
    "isFavorite": false,
    "sourceNote": "पारिवारिक संवाद और छठ व्रत का संकल्प"
  },
  {
    "id": "song-40",
    "title": "कार्तिक मास इजोरिया छठी माई",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "कार्तिक इजोरिया",
    "artwork": "/logo.svg",
    "duration": 407,
    "audioUrl": "https://archive.org/download/kartik-maas-ijoriya/KARTIK%20MAAS%20IJORIYA.mp3",
    "isFavorite": true,
    "sourceNote": "कार्तिक मास के शुक्ल पक्ष में छठ महापर्व का उल्लास"
  },
  {
    "id": "song-41",
    "title": "मोर भैया जईहे ला घाटे",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "भ्रातृ प्रेम छठ",
    "artwork": "/logo.svg",
    "duration": 310,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Mora-Bhaiya-Jaiye-La.mp3",
    "isFavorite": false,
    "sourceNote": "भाई के सिर पर दउरा लेकर घाट जाने पर बहन का मंगल गान"
  },
  {
    "id": "song-42",
    "title": "मईया अइली हमर अंगना",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मईया आगमन",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Maiya%20Aili.mp3",
    "isFavorite": false,
    "sourceNote": "घर-घर में छठी मैया के आगमन और स्वागत की खुशी"
  },
  {
    "id": "song-43",
    "title": "कोपी कोपी बोलेले सुरुज देव",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "संवाद लोकगीत",
    "artwork": "/logo.svg",
    "duration": 330,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Kopi-Kopi-Bol-Ke-Suruj-Dev.mp3",
    "isFavorite": true,
    "sourceNote": "सूर्य देव और व्रती के बीच भावनात्मक संवाद"
  },
  {
    "id": "song-44",
    "title": "भोरबे में नदिया तीरे ठाढ़ भेलहुँ",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Usha Arghya",
    "album": "नहाय-खाय व उषा",
    "artwork": "/logo.svg",
    "duration": 300,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Bhorbe%20Me%20Nadia.mp3",
    "isFavorite": false,
    "sourceNote": "भोर की ठंडक में नदी किनारे सूर्य दर्शन की साधना"
  },
  {
    "id": "song-45",
    "title": "छठ पूजा पावन बेला (रसियाव प्रसाद)",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Kharna",
    "album": "खरना महाप्रसाद",
    "artwork": "/logo.svg",
    "duration": 295,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Chhath%20Puja.mp3",
    "isFavorite": true,
    "sourceNote": "खरना के दिन रसियाव-रोटी प्रसाद का वितरण एवं निर्जला व्रत आरंभ"
  },
  {
    "id": "song-46",
    "title": "कार्तिक मास एहो पुनीत महिनवा",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "पुनीत महिनवा",
    "artwork": "/logo.svg",
    "duration": 320,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Kartik-Mash-Eho-Punit-Mahinawa.mp3",
    "isFavorite": false,
    "sourceNote": "पवित्र कार्तिक महीने में छठ साधना का महात्म्य"
  },
  {
    "id": "song-47",
    "title": "छठी मईया तोहर दुअरिया सजल बा",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Chhathi Maiya",
    "album": "तुलसी दुअरिया",
    "artwork": "/logo.svg",
    "duration": 310,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Chhathi%20Maiya.mp3",
    "isFavorite": false,
    "sourceNote": "तुलसी चौरा के समक्ष व्रत का संकल्प और मंगल गीतों का गायन"
  },
  {
    "id": "song-48",
    "title": "लामी लामी ऊंखिया सुरुज देव",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Sandhya Arghya",
    "album": "ऊंख सूप",
    "artwork": "/logo.svg",
    "duration": 320,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Lami%20Lami%20Unkhiya.mp3",
    "isFavorite": true,
    "sourceNote": "गन्ना और सूप से सुसज्जित घाट का पावन लोकगीत"
  },
  {
    "id": "song-49",
    "title": "काँचे ही बाँस के सुपलिया सुरुज देव",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "सुपलिया सिंगार",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Kounche%20Hi%20Pass.mp3",
    "isFavorite": false,
    "sourceNote": "बांस की नक्काशीदार सुपलिया में सूर्य देव को अर्घ्य"
  },
  {
    "id": "song-50",
    "title": "मोरे हे सईयां दउरा उठाउ",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Sandhya Arghya",
    "album": "दउरा घाट",
    "artwork": "/logo.svg",
    "duration": 330,
    "audioUrl": "https://archive.org/download/maithilichathsongs/More%20He%20Sainya.mp3",
    "isFavorite": true,
    "sourceNote": "संध्या अर्घ्य के लिए दउरा उठाने का पारंपरिक मैथिली गीत"
  },
  {
    "id": "song-51",
    "title": "उगिहें सुरुज गोसइयां हे भेल अरघ के बेर",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Usha Arghya",
    "album": "उषा अर्घ्य अमृत",
    "artwork": "/logo.svg",
    "duration": 293,
    "audioUrl": "https://archive.org/download/ugihen-suraj-gosaiyan-hey/Ugihen-Suraj-Gosaiyan-Hey.mp3",
    "isFavorite": true,
    "sourceNote": "शारदा सिन्हा का प्रातःकालीन अर्घ्य का अमर गान"
  },
  {
    "id": "song-52",
    "title": "जय छठी मईया (चला भाऊजी हाली हाली)",
    "artist": "सोनू निगम, पवन सिंह एवं खुशबू जैन (Sonu Nigam, Pawan Singh & Khushboo Jain)",
    "language": "Bhojpuri",
    "category": "Bhojpuri Chhath Geet",
    "album": "जय छठी मईया",
    "artwork": "/logo.svg",
    "duration": 267,
    "audioUrl": "audio/sonu_jai_chhathi_maiya.mp3",
    "isFavorite": true,
    "sourceNote": "सोनू निगम, पवन सिंह एवं खुशबू जैन का ऐतिहासिक व सर्वाधिक लोकप्रिय छठ गीत"
  },
  {
    "id": "song-53",
    "title": "शीतली बयरिया (जोड़े जोड़े फलवा सुरुज देव)",
    "artist": "पलक मुच्छल एवं पवन सिंह (Palak Muchhal & Pawan Singh)",
    "language": "Bhojpuri",
    "category": "Bhojpuri Chhath Geet",
    "album": "शीतली बयरिया",
    "artwork": "/logo.svg",
    "duration": 326,
    "audioUrl": "audio/palak_sitali_bayariya.mp3",
    "isFavorite": true,
    "sourceNote": "पलक मुच्छल एवं पवन सिंह के मधुर सुरों में सजा पावन छठ लोकगीत"
  },
  {
    "id": "song-54",
    "title": "जोड़े जोड़े सुपवा सुरुज देव",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Sandhya Arghya",
    "album": "सुपवा सिंगार",
    "artwork": "/logo.svg",
    "duration": 310,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Jore%20Jore%20Shupba.mp3",
    "isFavorite": true,
    "sourceNote": "अस्ताचलगामी भगवान भास्कर को सूप समर्पण का पावन लोकगीत"
  }
];

export const INITIAL_SONGS: Song[] = RAW_SONGS.map(s => ({
  ...s,
  lyrics: FULL_SONG_LYRICS[s.id] || s.lyrics
}));

class AppDatabase {
  private get<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private set<T>(key: string, val: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }

  // Settings
  getSettings(): UserSettings {
    return this.get<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  saveSettings(settings: Partial<UserSettings>): UserSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    this.set(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // Festival Days
  getFestivalDays(): FestivalDay[] {
    const cached = this.get<FestivalDay[]>(STORAGE_KEYS.DAYS, []);
    if (!cached || cached.length !== 4 || cached[0]?.date !== '2026-11-13') {
      this.saveFestivalDays(INITIAL_DAYS);
      return INITIAL_DAYS;
    }
    return cached;
  }

  saveFestivalDays(days: FestivalDay[]): void {
    this.set(STORAGE_KEYS.DAYS, days);
  }

  // Checklists
  getChecklist(): ChecklistItem[] {
    return this.get<ChecklistItem[]>(STORAGE_KEYS.CHECKLIST, INITIAL_CHECKLIST_ITEMS);
  }

  saveChecklist(items: ChecklistItem[]): void {
    this.set(STORAGE_KEYS.CHECKLIST, items);
  }

  toggleChecklistItem(id: string): ChecklistItem[] {
    const list = this.getChecklist();
    const updated = list.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item);
    this.saveChecklist(updated);
    return updated;
  }

  addChecklistItem(item: Omit<ChecklistItem, 'id'>): ChecklistItem[] {
    const list = this.getChecklist();
    const newItem: ChecklistItem = {
      ...item,
      id: 'custom-' + Date.now() + Math.random().toString(36).substring(2, 6),
      isCustom: true
    };
    const updated = [newItem, ...list];
    this.saveChecklist(updated);
    return updated;
  }

  deleteChecklistItem(id: string): ChecklistItem[] {
    const list = this.getChecklist();
    const updated = list.filter(item => item.id !== id);
    this.saveChecklist(updated);
    return updated;
  }

  resetChecklist(category?: string): ChecklistItem[] {
    const list = this.getChecklist();
    const updated = list.map(item => {
      if (!category || item.category === category) {
        return { ...item, isCompleted: false };
      }
      return item;
    });
    this.saveChecklist(updated);
    return updated;
  }

  // Family Tasks
  getFamilyTasks(): FamilyTask[] {
    return this.get<FamilyTask[]>(STORAGE_KEYS.FAMILY_TASKS, INITIAL_FAMILY_TASKS);
  }

  saveFamilyTasks(tasks: FamilyTask[]): void {
    this.set(STORAGE_KEYS.FAMILY_TASKS, tasks);
  }

  toggleFamilyTask(id: string): FamilyTask[] {
    const tasks = this.getFamilyTasks();
    const updated = tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t);
    this.saveFamilyTasks(updated);
    return updated;
  }

  addFamilyTask(title: string, assignedTo: string): FamilyTask[] {
    const tasks = this.getFamilyTasks();
    const newTask: FamilyTask = {
      id: 'task-' + Date.now(),
      title,
      assignedTo: assignedTo || 'Me',
      isCompleted: false,
      createdAt: Date.now()
    };
    const updated = [newTask, ...tasks];
    this.saveFamilyTasks(updated);
    return updated;
  }

  deleteFamilyTask(id: string): FamilyTask[] {
    const tasks = this.getFamilyTasks();
    const updated = tasks.filter(t => t.id !== id);
    this.saveFamilyTasks(updated);
    return updated;
  }

  // Mantras & Aarti
  getMantras(): MantraItem[] {
    return this.get<MantraItem[]>(STORAGE_KEYS.MANTRAS, INITIAL_MANTRAS);
  }

  toggleFavoriteMantra(id: string): MantraItem[] {
    const mantras = this.getMantras();
    const updated = mantras.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m);
    this.set(STORAGE_KEYS.MANTRAS, updated);
    return updated;
  }

  // Songs
  getSongs(): Song[] {
    const SONGS_VERSION_KEY = 'chhath_parv_songs_ver_1_4_0';
    const hasLatestLyrics = this.get<string>(SONGS_VERSION_KEY, '') === '1.4.0_verified_lyrics_and_singers';
    const cached = this.get<Song[]>(STORAGE_KEYS.SONGS, []);
    const needsRefresh = !hasLatestLyrics ||
      !cached || 
      cached.length < INITIAL_SONGS.length || 
      cached.some(s => !s.audioUrl || s.audioUrl.includes('.wav')) || 
      cached[0]?.audioUrl !== 'audio/kaanche_hi_bansh.mp3' ||
      cached[32]?.audioUrl !== INITIAL_SONGS[32]?.audioUrl ||
      !cached[0]?.lyrics ||
      cached[0].lyrics.length < 350;

    if (needsRefresh) {
      const imported = (cached || []).filter(s => s.isLocal);
      const combined = [...INITIAL_SONGS, ...imported];
      this.saveSongs(combined);
      this.set(SONGS_VERSION_KEY, '1.4.0_verified_lyrics_and_singers');
      return combined;
    }
    return cached;
  }

  saveSongs(songs: Song[]): void {
    this.set(STORAGE_KEYS.SONGS, songs);
  }

  toggleFavoriteSong(id: string): Song[] {
    const songs = this.getSongs();
    const updated = songs.map(s => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s);
    this.saveSongs(updated);
    return updated;
  }

  addImportedSong(song: Song): Song[] {
    const songs = this.getSongs();
    const updated = [song, ...songs];
    this.saveSongs(updated);
    return updated;
  }

  // Personal Notes
  getNotes(): PersonalNote[] {
    return this.get<PersonalNote[]>(STORAGE_KEYS.NOTES, [
      {
        id: 'note-1',
        title: 'इस वर्ष का पारिवारिक संकल्प',
        content: 'इस वर्ष गंगा घाट पर सभी परिवारजन एक साथ पहुँचेंगे। दउरा सजाने का काम दोपहर 2 बजे तक पूरा कर लेना है।',
        isPinned: true,
        isFavorite: true,
        updatedAt: Date.now() - 3600000
      }
    ]);
  }

  saveNote(note: Partial<PersonalNote> & { title: string; content: string }): PersonalNote[] {
    const notes = this.getNotes();
    if (note.id) {
      const updated = notes.map(n => n.id === note.id ? { ...n, ...note, updatedAt: Date.now() } : n);
      this.set(STORAGE_KEYS.NOTES, updated);
      return updated;
    } else {
      const newNote: PersonalNote = {
        id: 'note-' + Date.now(),
        title: note.title,
        content: note.content,
        isPinned: !!note.isPinned,
        isFavorite: !!note.isFavorite,
        updatedAt: Date.now()
      };
      const updated = [newNote, ...notes];
      this.set(STORAGE_KEYS.NOTES, updated);
      return updated;
    }
  }

  deleteNote(id: string): PersonalNote[] {
    const notes = this.getNotes();
    const updated = notes.filter(n => n.id !== id);
    this.set(STORAGE_KEYS.NOTES, updated);
    return updated;
  }

  // Fasting Tracker
  getFastingState(): FastingTrackerState {
    return this.get<FastingTrackerState>(STORAGE_KEYS.FASTING, {
      isFastingActive: false,
      startedAt: null,
      dayKey: 'nahay_khay',
      waterIntakeTracked: false,
      paranaDone: false,
      personalNotes: ''
    });
  }

  saveFastingState(state: FastingTrackerState): void {
    this.set(STORAGE_KEYS.FASTING, state);
  }

  // Full Backup / Restore
  exportBackupJson(): string {
    const fullData = {
      settings: this.getSettings(),
      festivalDays: this.getFestivalDays(),
      checklist: this.getChecklist(),
      familyTasks: this.getFamilyTasks(),
      notes: this.getNotes(),
      mantras: this.getMantras(),
      songs: this.getSongs(),
      fasting: this.getFastingState(),
      exportDate: new Date().toISOString(),
      appVersion: '1.0.0'
    };
    return JSON.stringify(fullData, null, 2);
  }

  importBackupJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.settings) this.saveSettings(parsed.settings);
      if (parsed.festivalDays) this.saveFestivalDays(parsed.festivalDays);
      if (parsed.checklist) this.saveChecklist(parsed.checklist);
      if (parsed.familyTasks) this.saveFamilyTasks(parsed.familyTasks);
      if (parsed.notes) this.set(STORAGE_KEYS.NOTES, parsed.notes);
      if (parsed.mantras) this.set(STORAGE_KEYS.MANTRAS, parsed.mantras);
      if (parsed.songs) this.saveSongs(parsed.songs);
      if (parsed.fasting) this.saveFastingState(parsed.fasting);
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  }
}

export const db = new AppDatabase();
