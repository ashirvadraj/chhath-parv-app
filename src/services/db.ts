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
    date: '2026-11-15',
    dayOfWeek: 'रविवार (Sunday)',
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
    date: '2026-11-16',
    dayOfWeek: 'सोमवार (Monday)',
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
    date: '2026-11-17',
    dayOfWeek: 'मंगलवार (Tuesday)',
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
    date: '2026-11-18',
    dayOfWeek: 'बुधवार (Wednesday)',
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
export const INITIAL_SONGS: Song[] = [
  {
    "id": "song-1",
    "title": "काँच ही बाँस के बहँगिया",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "छठ महापर्व लोक धरोहर",
    "artwork": "/logo.svg",
    "duration": 320,
    "audioUrl": "audio/kaanche_hi_bansh.mp3",
    "isFavorite": true,
    "sourceNote": "छठ महापर्व का सर्वाधिक लोकप्रिय व प्रसिद्ध पारंपरिक लोकगीत",
    "lyrics": "काँच ही बाँस के बहँगिया, बहँगी लचकत जाए...\nबहँगी लचकत जाए!\nबात जे पूछेला बटोहिया, बहँगी केकरा के जाए?\nबहँगी केकरा के जाए...\n\nतू त आन्हर हउवे रे बटोहिया, बहँगी सुरुज देव के जाए।\nबहँगी छठी मईया के जाए...\n\nकाँच ही बाँस के दउरवा, दउरा लचकत जाए।\nदउरा घाटे पहुँचे जाए..."
  },
  {
    "id": "song-2",
    "title": "केरवा जे फरेला घवद से",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "छठी मईया के वरदान",
    "artwork": "/logo.svg",
    "duration": 295,
    "audioUrl": "audio/marbo_re_sugwa.mp3",
    "isFavorite": true,
    "sourceNote": "पवित्र फल अर्पण एवं सुगवा प्रसंग का अमर लोकगीत",
    "lyrics": "केरवा जे फरेला घवद से, ओह पर सुगा मँडराय...\nओह पर सुगा मँडराय!\nमारबो रे सुगवा धनुख से, सुगा गिरे मुरझाय...\n\nसुगनी जे रोवे ले वियोग से, आदित होई ना सहाय।\nअमरूद जे फरेला घवद से, ओह पर सुगा मँडराय..."
  },
  {
    "id": "song-3",
    "title": "उग हे सुरुज देव भेल अरघ के बेर",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Usha Arghya",
    "album": "भोरवा अरघ विशेष",
    "artwork": "/logo.svg",
    "duration": 340,
    "audioUrl": "https://archive.org/download/ugihen-suraj-gosaiyan-hey/Ugihen-Suraj-Gosaiyan-Hey.mp3",
    "isFavorite": true,
    "sourceNote": "उदीयमान भगवान भास्कर को प्रातः अर्घ्य अर्पण गीत",
    "lyrics": "उग हे सुरुज देव भेल अरघ के बेर...\nभेल अरघ के बेर!\nअंगना में ठाढ़े सेविका, अरघिया के बेर...\n\nपूरब से उगेले सुरुजमल, लाल भईल संसार।\nदर्शन दीहीं हे दीनानाथ, मिटा दीहीं अंधकार..."
  },
  {
    "id": "song-4",
    "title": "जोड़े जोड़े फलवा सुरुज देव",
    "artist": "अनुराधा पौडवाल (Anuradha Paudwal)",
    "language": "Bhojpuri",
    "category": "Sandhya Arghya",
    "album": "दउरा सजाय के",
    "artwork": "/logo.svg",
    "duration": 280,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Jore%20Jore%20Shupba.mp3",
    "isFavorite": true,
    "sourceNote": "अस्ताचलगामी सूर्य देव को सूप अर्पण का पावन भजन",
    "lyrics": "जोड़े जोड़े फलवा सुरुज देव, सूपवा चढ़ाईं हम...\nसूपवा चढ़ाईं हम!\nघटवा पे ठाढ़ होके सुरुजमल, तोहार गुण गाईं हम...\n\nनारियर, केलवा, डाभ निम्बुआ, सब सूप में धराईं।\nसँझिया अरघिया में दीनानाथ के ध्यान लगाईं..."
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
    "sourceNote": "प्रथम बार छठ व्रत करने वाले व्रतियों की आत्मीय भावना",
    "lyrics": "पहिले पहिल हम कईनी, छठी मईया व्रत तोहार...\nछठी मईया व्रत तोहार!\nकरिहा क्षमा छठी मईया, भूल-चूक गलती हमार...\n\nमाटी के चूल्हवा पे खीर हम बनइली।\nरसियाव के परसादी मईया तोहरा चढ़वली..."
  },
  {
    "id": "song-6",
    "title": "पटना के घटिया पर हमहूं अरघिया देब",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Sandhya Arghya",
    "album": "गंगा तीरे छठ",
    "artwork": "/logo.svg",
    "duration": 310,
    "audioUrl": "https://archive.org/download/ho-deenanath/Ho-Deenanath.mp3",
    "isFavorite": false,
    "sourceNote": "गंगा तट पर छठ पर्व की भव्यता का सजीव वर्णन",
    "lyrics": "पटना के घटिया पर हमहूं अरघिया देब...\nहमहूं अरघिया देब!\nछठी मईया के पावन चरनिया शीश नवाएब...\n\nलाखों दीप जले गंगा किनारे, गूँजे जय जयकार।\nसुरुज देव के किरिन बिखरे, निर्मल गंगा धार..."
  },
  {
    "id": "song-7",
    "title": "मारबो रे सुगवा धनुष से",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "सुगवा के बियोग",
    "artwork": "/logo.svg",
    "duration": 335,
    "audioUrl": "https://archive.org/download/kelva-ke-paat-par/Kelva%20Ke%20Paat%20Par.mp3",
    "isFavorite": false,
    "sourceNote": "छठ के प्रसाद की शुचिता एवं पवित्रता से जुड़ा लोकगीत",
    "lyrics": "मारबो रे सुगवा धनुष से, सुगा गिरे मुरझाय...\nउहे सुगवा जे जूठ कईले फलवा, आदित ना सहाय!\n\nसुगनी रोवे ले डाढ़ पर ठाढ़ी, कइसे छठ बरतिया होइहें?\nछठी मईया से विनती बा, सब फल शुद्ध कराईं..."
  },
  {
    "id": "song-8",
    "title": "हो दीनानाथ सुन लीं अरज हमार",
    "artist": "सूर्य वंदना (Surya Vandana)",
    "language": "Hindi",
    "category": "Hindi Devotional",
    "album": "आदित्य स्तुति",
    "artwork": "/logo.svg",
    "duration": 275,
    "audioUrl": "audio/ho_deenanath.mp3",
    "isFavorite": false,
    "sourceNote": "समस्त कष्टों के निवारण हेतु सूर्य भगवान की करुणामयी प्रार्थना",
    "lyrics": "हो दीनानाथ, सुन लीं अरज हमार...\nसुन लीं अरज हमार!\nदीन-दुखी के दाता तुहीं, जग के पालनहार...\n\nतेज तिहारो त्रिभुवन चमके, तुमहिं ज्ञान प्रकाश।\nहम बालक शरण तिहारी, पूरी करहु आस..."
  },
  {
    "id": "song-9",
    "title": "चारि पहर राती जल थल सेवा ला",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मिथिला छठि सोहावन",
    "artwork": "/logo.svg",
    "duration": 315,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Patna%20ke%20Ghatba.mp3",
    "isFavorite": true,
    "sourceNote": "मिथिलांचल का हृदयस्पर्शी चार पहर रात की आराधना का गीत",
    "lyrics": "चारि पहर राती जल थल सेवा ला...\nजल थल सेवा ला!\nसुरुज देव के दर्शन ला व्रती जल में ठाढ़ भेल...\n\nअंगना में कूस के पाटी बिछओल, अरघ सूप सजओल।\nहे छठी मईया दया करू, मिथिला के पावन पर्व..."
  },
  {
    "id": "song-10",
    "title": "छठी मईया दिहीं आशीष",
    "artist": "अनुराधा पौडवाल (Anuradha Paudwal)",
    "language": "Bhojpuri",
    "category": "Chhathi Maiya",
    "album": "वरदान मईया के",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Gohre-Khadauwan-A-Aditmal.mp3",
    "isFavorite": false,
    "sourceNote": "संतान, कुल एवं परिवार की सुख-शांति का मंगल वरदान",
    "lyrics": "छठी मईया दिहीं आशीष, घर-घर मंगल होय...\nघर-घर मंगल होय!\nजो नर-नारी व्रत करे, दुःख ना पावे कोय...\n\nअखंड सोहाग दिहीं मईया, संतान के सुख दीहीं।\nअन्न-धन के भंडार भरे, सब मनोरथ पूरा कीहीं..."
  },
  {
    "id": "song-11",
    "title": "केलवा के पात पर उगेलन सुरुज देव",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Usha Arghya",
    "album": "प्रातः अर्घ्य गान",
    "artwork": "/logo.svg",
    "duration": 310,
    "audioUrl": "https://archive.org/download/uthau-surooj-bhaile-bihaan/Uthau%20Surooj%20Bhaile%20Bihaan.mp3",
    "isFavorite": true,
    "sourceNote": "प्रातः काल सूर्य की किरणों का केले के पत्तों पर स्वर्णिम दृश्य",
    "lyrics": "केलवा के पात पर उगेलन सुरुज देव, झाँके-झुके...\nझाँके-झुके!\nअमल कमल दल फूल खिले, पूरब लाली झुके...\n\nव्रती ठाढ़े गंगा तीरे, लोटा दूध लिए हाथ।\nअरघ देबे सुरुज देव के, पूरी भईल छठि रात..."
  },
  {
    "id": "song-12",
    "title": "आरा के घटिया पे लागल बा भीड़",
    "artist": "पवन सिंह (Pawan Singh)",
    "language": "Bhojpuri",
    "category": "Bhojpuri Chhath Geet",
    "album": "भोजपुर छठ मेला",
    "artwork": "/logo.svg",
    "duration": 265,
    "audioUrl": "https://archive.org/download/baanjhi-kewdwa-dhaile-thaadh/Baanjhi%20Kewdwa%20Dhaile%20Thaadh.mp3",
    "isFavorite": true,
    "sourceNote": "भोजपुर क्षेत्र के घाटों पर उमड़े जनसैलाब और भक्ति की उमंग",
    "lyrics": "आरा के घटिया पे लागल बा भीड़, सजल बा दउरवा अपार...\nबाजे शहनाई नगाड़ा, गूँजे छठी माई जयकार!\n\nसभका माथे पीला सिन्दूर, सूप सजल बा भारी।\nपवन भईया अरघिया देले, भक्ति भईल मतवारी..."
  },
  {
    "id": "song-13",
    "title": "उगीं हे दीनानाथ अरघ के बेरिया",
    "artist": "कल्पना पटोवारी (Kalpana Patowary)",
    "language": "Bhojpuri",
    "category": "Usha Arghya",
    "album": "अरघ के बेरा",
    "artwork": "/logo.svg",
    "duration": 325,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Ghatwa-Ke-Aari-Aari.mp3",
    "isFavorite": false,
    "sourceNote": "भोर की ठंडक में जल में खड़े व्रतियों द्वारा सूर्य देव का आवाहन",
    "lyrics": "उगीं हे दीनानाथ, अरघ के बेरिया भईल...\nअरघ के बेरिया भईल!\nकमर भर पनिया में ठाढ़े भईल सेविका...\n\nशीत लहरे शरीर काँपे, मन में भक्ति अपार।\nअब त दरस देखावा सुरुजमल, होखे पारन के संभार..."
  },
  {
    "id": "song-14",
    "title": "दरस देखाईं हे सुरुज देव",
    "artist": "खेसारी लाल यादव (Khesari Lal Yadav)",
    "language": "Bhojpuri",
    "category": "Bhojpuri Chhath Geet",
    "album": "छठी मईया के द्वारे",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Sone-Ke-Khadauwa-He-Dinanath.mp3",
    "isFavorite": true,
    "sourceNote": "भगवान भास्कर से दर्शन देने की भावुक प्रार्थना",
    "lyrics": "दरस देखाईं हे सुरुज देव, अँजुरी भरल बा दूध से...\nहाथ जोड़ी ठाढ़ बानी, विनती करेनी मन से!\n\nसूरज बाबा किरिन बिखेरा, घाट भईल गुलजार।\nछठी माई के चरनिया में झुकल बा संसार..."
  },
  {
    "id": "song-15",
    "title": "छठी मईया सुन लीं पुकार",
    "artist": "मनोज तिवारी (Manoj Tiwari)",
    "language": "Bhojpuri",
    "category": "Bhojpuri Chhath Geet",
    "album": "छठ के बरबस याद",
    "artwork": "/logo.svg",
    "duration": 340,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Aradh%20Le%20La.mp3",
    "isFavorite": true,
    "sourceNote": "लोक आस्था और मातृत्व की देवी छठी मैया की पुकार",
    "lyrics": "छठी मईया सुन लीं पुकार, हमनी के संकट टारीं...\nदुःख-दारिद्र सब दूर बहाईं, सुख के दीप उजारीं!\n\nसिर पर दउरा उठाई के अइली, घाटे लागल बा मेला।\nमईया के कृपा से सफल भईल छठ बरतिया के बेला..."
  },
  {
    "id": "song-16",
    "title": "दउरा उठाईं कान्हा अरघिया के बेरा",
    "artist": "देवी (Devi)",
    "language": "Bhojpuri",
    "category": "Sandhya Arghya",
    "album": "घाटे चलो सजनी",
    "artwork": "/logo.svg",
    "duration": 275,
    "audioUrl": "https://archive.org/download/hey-chhatthi-maiya/Hey-Chhatthi-Maiya.mp3",
    "isFavorite": false,
    "sourceNote": "परिवार के युवा सदस्यों द्वारा सिर पर दउरा उठाने की परंपरा",
    "lyrics": "दउरा उठाईं कान्हा, अरघिया के बेरा भईल...\nसँझिया के बेर भईल!\nमाई के सँगवा चलीं सब भाई, घटवा सजल सुंदर...\n\nबाँस के बहँगी सूप सजवले, ठेकुआ के महक सुवास।\nछठी मईया के दर्शन से मन में जगे उल्लास..."
  },
  {
    "id": "song-17",
    "title": "सुरुज बाबा अहिरन घरे जइहें",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "प्राचीन छठ संपदा",
    "artwork": "/logo.svg",
    "duration": 330,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Hathwa-Mein-Fulwa-Dallaiya.mp3",
    "isFavorite": false,
    "sourceNote": "सूर्य देव के विभिन्न घरों में जाने का प्राचीन रूपक लोकगीत",
    "lyrics": "सुरुज बाबा अहिरन घरे जइहें, धेनु चराई ले अइहें...\nदूध-दही के भोग लगइहें, छठी माई के रीझइहें!\n\nसबके घरे उजेला फैले, मिटे अविद्या-अंधकार।\nसुरुज देव के किरपा से धन्य भईल संसार..."
  },
  {
    "id": "song-18",
    "title": "सामा चकेवा आवेली छठी घाटे",
    "artist": "मैथिली लोकगीत (Maithili Folk)",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मिथिला लोक संस्कृति",
    "artwork": "/logo.svg",
    "duration": 305,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Daura%20Uthawa%20Na.mp3",
    "isFavorite": false,
    "sourceNote": "छठ और सामा-चकेवा पर्व के मधुर संगम का मैथिली गीत",
    "lyrics": "सामा चकेवा आवेली छठी घाटे, भैया के दीघायु वरदान...\nछठी मईया सुनती पुकार, मिथिला के पावन सान!\n\nमाटी के मूर्ति सजायल, दीप जराओल घाट।\nभोरवा अरघिया में सुरुज देव देखलनि पावन बाट..."
  },
  {
    "id": "song-19",
    "title": "घाटे चहुँपल छठी मईया के रथ",
    "artist": "अनुराधा पौडवाल (Anuradha Paudwal)",
    "language": "Bhojpuri",
    "category": "Chhathi Maiya",
    "album": "मईया के आगमन",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/chaar-pahar-hum-jal-thal/Chaar%20Pahar%20Hum%20Jal%20Thal.mp3",
    "isFavorite": true,
    "sourceNote": "छठी मैया के सूर्य रथ पर सवार होकर घाट पर पधारने का गान",
    "lyrics": "घाटे चहुँपल छठी मईया के रथ, बाजे शंख-निशान...\nभक्तन के मन पुलकित भईल, पाके मईया के वरदान!\n\nसात घोड़ा के रथ पर साजे, सूरज देव भगवान।\nछठी मईया के दर्शन से धन्य भईल जहान..."
  },
  {
    "id": "song-20",
    "title": "सभे सूप सजाईं सुरुज देव के",
    "artist": "पवन सिंह (Pawan Singh)",
    "language": "Bhojpuri",
    "category": "Bhojpuri Chhath Geet",
    "album": "सूपवा सजल बा",
    "artwork": "/logo.svg",
    "duration": 280,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Chatti%20Maiya.mp3",
    "isFavorite": false,
    "sourceNote": "सूप में 36 प्रकार के फल व प्रसाद सजाने का सामूहिक लोकगीत",
    "lyrics": "सभे सूप सजाईं सुरुज देव के, पान-सुपाड़ी फूल...\nधूप-दीप और अगरबत्ती, मिटे जन्म के शूल!\n\nठेकुआ, खजूर, सिंघाड़ा, मूली, अदरक हरी अपार।\nछठी मईया के चरणों में अर्पित सारा संसार..."
  },
  {
    "id": "song-21",
    "title": "रुनिझुनि बाजे पाजनिया सुरुज देव",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "मधुर छठ धुन",
    "artwork": "/logo.svg",
    "duration": 315,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Mahima-Baa-Agam-Apaar.mp3",
    "isFavorite": true,
    "sourceNote": "छठी मैया के नूपुरों की मधुर झंकार और आगमन",
    "lyrics": "रुनिझुनि बाजे पाजनिया सुरुज देव, मईया आवें घाट...\nसुवर्ण कलश जल भरी राखल, निर्मल गंगा बाट!\n\nआदित्य देव के किरन चमके, भईल सवेरा भोर।\nसब नर-नारी जयकार लगावें, गूँजे चारु ओर..."
  },
  {
    "id": "song-22",
    "title": "अरघ के बेर भईल सुरुज देव",
    "artist": "खेसारी लाल यादव (Khesari Lal Yadav)",
    "language": "Bhojpuri",
    "category": "Sandhya Arghya",
    "album": "सँझिया अरघिया",
    "artwork": "/logo.svg",
    "duration": 285,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Tohre%20Aas%20Me.mp3",
    "isFavorite": false,
    "sourceNote": "संध्या बेला में डूबते सूर्य को अर्घ्य समर्पण",
    "lyrics": "अरघ के बेर भईल सुरुज देव, जल में ठाढ़े व्रती...\nदूध-जल के धार गिरावे, पावन भईल ये मति!\n\nसँझिया के बेरा डूबत सुरुज के करेनी नमन।\nकल भोर में फेर दर्शन दिहीं, धन्य होई जीवन..."
  },
  {
    "id": "song-23",
    "title": "हे छठी मईया तोहर महिमा अपार",
    "artist": "अनुराधा पौडवाल (Anuradha Paudwal)",
    "language": "Bhojpuri",
    "category": "Chhathi Maiya",
    "album": "महिमा अपार",
    "artwork": "/logo.svg",
    "duration": 300,
    "audioUrl": "https://archive.org/download/chhathi-maiya-bulaye/CHHATHI%20MAIYA%20BULAYE%20.mp3",
    "isFavorite": true,
    "sourceNote": "छठी मैया के अलौकिक चमत्कारों एवं मातृत्व का गुणगान",
    "lyrics": "हे छठी मईया तोहर महिमा अपार, निर्धन के धन देलू...\nअन्हरा के आँख देलू, बांझिन के गोदी भर देलू!\n\nजे तोहार व्रत करे नेम-निष्ठा से, सब संकट हर लेलू।\nसदा सुहागिन रहे व्रती, अमर सोहाग वर देलू..."
  },
  {
    "id": "song-24",
    "title": "गंगाजी के पावन तीरे सजल बा दउरवा",
    "artist": "मनोज तिवारी (Manoj Tiwari)",
    "language": "Bhojpuri",
    "category": "Sandhya Arghya",
    "album": "गंगा तट छठ",
    "artwork": "/logo.svg",
    "duration": 330,
    "audioUrl": "https://archive.org/download/hey-ganga-maiya/Hey%20Ganga%20Maiya.mp3",
    "isFavorite": false,
    "sourceNote": "गंगा किनारे दीयों की लड़ियों और दउरों की छटा",
    "lyrics": "गंगाजी के पावन तीरे सजल बा दउरवा, जगमगात बा घाट...\nहजारों दीया टिमटिमावे, सुरुज देव के बाट!\n\nहर हर गंगे, जय छठी मईया, गूँजे पावन नाद।\nव्रती के कठिन तपस्या से मिले महाप्रसाद..."
  },
  {
    "id": "song-25",
    "title": "सुगना बोलेला डाभे निम्बुआ पे",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "लोक मानस छठ",
    "artwork": "/logo.svg",
    "duration": 320,
    "audioUrl": "https://archive.org/download/penhle-mahadev-piyariya/Penhle%20Mahadev%20Piyariya.mp3",
    "isFavorite": false,
    "sourceNote": "डाभ नींबू के पौधे पर सुग्गा का पारंपरिक संवाद",
    "lyrics": "सुगना बोलेला डाभे निम्बुआ पे, ई फल केकरा के जाए?\nछठी मईया के परसादी बा, सुगना मत जूठियाए!\n\nशुद्ध मन से फल तोड़ीं, सूप में धरीं सजाय।\nसुरुज देव के अर्पण होई, कुल के मंगल थाय..."
  },
  {
    "id": "song-26",
    "title": "बहँगी लचकत जाए सुरुज देव के",
    "artist": "देवी (Devi)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "छठ के पावन दिन",
    "artwork": "/logo.svg",
    "duration": 295,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Ugo%20Ho%20Uraj.mp3",
    "isFavorite": false,
    "sourceNote": "बांस की बहँगी कंधे पर लेकर घाट की ओर जाने का भावुक गान",
    "lyrics": "बहँगी लचकत जाए सुरुज देव के, पाँव पड़े डगमग...\nमन में छठी मईया के मूरत, जगमगाए मग-मग!\n\nघाटे पहुँच के दउरा उतारीं, सूप सजाईं चार।\nछठी मईया के आशीष से संवरे सब संसार..."
  },
  {
    "id": "song-27",
    "title": "उदित भये भगवान भाष्कर",
    "artist": "शास्त्रीय सूर्य स्तुति",
    "language": "Hindi",
    "category": "Hindi Devotional",
    "album": "आदित्य हृदय गान",
    "artwork": "/logo.svg",
    "duration": 350,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Callu%20Challu.mp3",
    "isFavorite": true,
    "sourceNote": "वेदोक्त मंत्रों एवं सूर्य उपासना का पावन स्तुति गान",
    "lyrics": "उदित भये भगवान भाष्कर, तम सब दूर बहायो...\nस्वर्ण किरण की आभा लेकर, नव-जीवन प्रगटायो!\n\nॐ आदित्याय नमः, ॐ रवये नमः, ॐ भास्कराय नमः।\nछठ महापर्व पर हे भुवनपति, स्वीकारें अर्घ्य हमारा..."
  },
  {
    "id": "song-28",
    "title": "माटी के चूल्हा पे बने रसियाव",
    "artist": "खरना विशेष लोकगीत",
    "language": "Bhojpuri",
    "category": "Kharna",
    "album": "खरना के महाप्रसाद",
    "artwork": "/logo.svg",
    "duration": 280,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Sainya%20Laika.mp3",
    "isFavorite": true,
    "sourceNote": "खरना के दिन मिट्टी के चूल्हे पर गुड़ की खीर बनाने की विधि व भाव",
    "lyrics": "माटी के चूल्हा पे बने रसियाव, आम के काठी आगि...\nअरवा चउर गुड़ दूध में पके, पवित्र भावना जागी!\n\nघी चुपड़ी रोटी के सँगवा, केले के पात भोग लगावें।\nएकांत शांत मन से व्रती, छठी मईया के ध्यावें..."
  },
  {
    "id": "song-29",
    "title": "धोवहु रे बहँगी घाट पहुँचावहु",
    "artist": "पारंपरिक लोकगीत (Traditional)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "लोक रीति छठ",
    "artwork": "/logo.svg",
    "duration": 305,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Ghat%20Par%20Narial.mp3",
    "isFavorite": false,
    "sourceNote": "घाट की सफाई एवं बहँगी धोने की प्राचीन परंपरा",
    "lyrics": "धोवहु रे बहँगी घाट पहुँचावहु, गंगा जल छिड़कवावहु...\nमाटी के वेदी दीप जलाय के, चुनरी लाल चढ़ावहु!\n\nसबके हृदय में भक्ति जागे, मिटे भेदभाव के क्लेश।\nछठी मईया के पावन परब में धन्य भईल हमरो देश..."
  },
  {
    "id": "song-30",
    "title": "सुरुज देव के रथवा सजल चारु ओर",
    "artist": "पवन सिंह (Pawan Singh)",
    "language": "Bhojpuri",
    "category": "Bhojpuri Chhath Geet",
    "album": "रथवा सुरुजमल के",
    "artwork": "/logo.svg",
    "duration": 270,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Darshan%20Dihi%20Bhore.mp3",
    "isFavorite": false,
    "sourceNote": "भगवान सूर्य के सात घोड़ों के स्वर्णिम रथ का उल्लासपूर्ण गान",
    "lyrics": "सुरुज देव के रथवा सजल चारु ओर, सात घोड़ा चमकेला...\nअरुण देव हाँकेला रथा, पूरब लाली दमकेला!\n\nअर्घ्य देईं दूध-गंगाजल से, हाथ जोड़ शीश झुकाईं।\nपवन भईया गावें मंगल, छठी माई के रीझाईं..."
  },
  {
    "id": "song-31",
    "title": "छठी मईया के पावन बरतिया",
    "artist": "कल्पना पटोवारी (Kalpana Patowary)",
    "language": "Bhojpuri",
    "category": "Chhathi Maiya",
    "album": "बरतिया के नेह",
    "artwork": "/logo.svg",
    "duration": 315,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Maiya%20Ke%20Brat.mp3",
    "isFavorite": false,
    "sourceNote": "36 घंटे निर्जला व्रत रखने वाली व्रतियों की तपस्या",
    "lyrics": "छठी मईया के पावन बरतिया, धन्य बा माई के तप...\nबिना अन्न-जल तीन दिन ठाढ़ी, जपे निरंतर जप!\n\nघर-परिवार के संकट काटे, संतान के देईं लंबी उमरिया।\nछठी मईया के चरन शरण में सफल भईल जिनगिया..."
  },
  {
    "id": "song-32",
    "title": "ललनवा खातिर माई करेली छठ बरत",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "ममतामयी छठ",
    "artwork": "/logo.svg",
    "duration": 335,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Chhath%20Geet.mp3",
    "isFavorite": true,
    "sourceNote": "संतान की दीर्घायु और कल्याण के लिए मां की तपस्या",
    "lyrics": "ललनवा खातिर माई करेली छठ बरत, आँचर पसारि माँगे भीख...\nहे छठी मईया ललन जुग जिए, दीहीं सुबुद्धि सुसीख!\n\nगोदी में खेले बालक सुंदर, कुल के नाम बढ़ावे।\nमाई के तपस्या से सुरुज देव, घर में सुख बरसावे..."
  },
  {
    "id": "song-33",
    "title": "काँच ही बाँस के डलिया सजाय के",
    "artist": "अनुराधा पौडवाल (Anuradha Paudwal)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "डलिया सजल बा",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/maithilichathsongs/kacha%20Hey%20Kee.mp3",
    "isFavorite": false,
    "sourceNote": "बांस की डलिया में फल व पूजन सामग्री सजाने का गीत",
    "lyrics": "काँच ही बाँस के डलिया सजाय के, चलली व्रती घाट...\nगंगा मइया के तीरे बिछल बा, कंचन-वरन के पाट!\n\nसूप में नारियल, सेब, सिंघाड़ा, सुथनी कंदा भारी।\nछठी माई के दर्शन पाके, धन्य भईल संसारी..."
  },
  {
    "id": "song-34",
    "title": "उषा बेला में अर्घ्य समर्पण",
    "artist": "सूर्य वंदना (Surya Vandana)",
    "language": "Hindi",
    "category": "Usha Arghya",
    "album": "उषा वंदना",
    "artwork": "/logo.svg",
    "duration": 310,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Chhaith%20Paavain.mp3",
    "isFavorite": false,
    "sourceNote": "भोर के समय सूर्य की प्रथम किरण के दर्शन और अर्घ्य",
    "lyrics": "उषा बेला में अर्घ्य समर्पण, हे दिवाकर नमन तिहारे...\nशीतल जल में खड़े तपस्वी, केवल तेरे सहारे!\n\nअरुणोदय से जगमग धरती, नव-चेतना का विस्तार।\nछठी मईया संग सूर्य विराजे, जय जयकार अपार..."
  },
  {
    "id": "song-35",
    "title": "अंगना में कोसी भराईब हे छठी मईया",
    "artist": "पारंपरिक कोसी लोकगीत",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "कोसी भराई विशेष",
    "artwork": "/logo.svg",
    "duration": 340,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Narial%20Baje.mp3",
    "isFavorite": true,
    "sourceNote": "मन्नत पूर्ण होने पर गन्ने के मंडप में कोसी भरने का पावन अनुष्ठान",
    "lyrics": "अंगना में कोसी भराईब हे छठी मईया, गन्ना के मंडप छाईब...\nचौबीस दीया माटी के सजीहें, मंगल सोहर गाईब!\n\nहाथी सजल माटी के सुंदर, कलश धरल बा भारी।\nकोसी भरन से मन्नत पूरे, प्रसन्न होय महतारी..."
  },
  {
    "id": "song-36",
    "title": "सुरुजमल आवेलन आज हमार अँगना",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "आगमन सूर्य देव",
    "artwork": "/logo.svg",
    "duration": 320,
    "audioUrl": "https://archive.org/download/ghatwa-ke-aari-aari/Ghatwa_Ke_Aari_Aari.mp3",
    "isFavorite": false,
    "sourceNote": "सूर्य भगवान के आंगन में पधारने का आत्मीय लोकगीत",
    "lyrics": "सुरुजमल आवेलन आज हमार अँगना, कंचन थाल सजाईं...\nगंगाजल से चरण पखारीं, चंदन तिलक लगाईं!\n\nपूरब से उदित भये दीनानाथ, जगमग भईल दुवार।\nछठी मईया के सँगवा अइले, धन्य भईल परिवार..."
  },
  {
    "id": "song-37",
    "title": "घटवा पर बाजे शहनाई सुरुज देव",
    "artist": "शहनाई व नगाड़ा वादन (Shehnai)",
    "language": "Traditional",
    "category": "Instrumental",
    "album": "छठ वाद्य वृंद",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/chanani-taane-chalale/Chanani%20Taane%20Chalale.mp3",
    "isFavorite": false,
    "sourceNote": "गंगा घाट पर गूँजती पारंपरिक शहनाई, शंख व नगाड़े की मंगल धुन",
    "lyrics": "♪ (पारंपरिक शहनाई एवं नगाड़ा मंगल वादन) ♪\n\nगंगा तीरे भोर और सांझ में बजने वाली पावन शहनाई की मंगल धुन।\nछठी मैया के आगमन पर बजने वाले दिव्य मंगल वाद्य।"
  },
  {
    "id": "song-38",
    "title": "गंगा जल भरी लोटा अरघिया हम देब",
    "artist": "पवन सिंह (Pawan Singh)",
    "language": "Bhojpuri",
    "category": "Sandhya Arghya",
    "album": "अरघिया के जल",
    "artwork": "/logo.svg",
    "duration": 280,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Je%20Karelagu%20Chhat.mp3",
    "isFavorite": false,
    "sourceNote": "तांबे के लोटे में गंगाजल भरकर सूर्य को अर्पित करने का भाव",
    "lyrics": "गंगा जल भरी लोटा, अरघिया हम देब...\nछठी मईया के चरन पखारब, ध्यान मगन होय जेब!\n\nपीतल कलश में दूध सजावल, लाल चुनरिया ओढ़ी।\nपवन सिंह गावें भक्ति से, हाथ दुनो हम जोड़ी..."
  },
  {
    "id": "song-39",
    "title": "अस्ताचल सूर्य वंदना (संध्या अरघ)",
    "artist": "शास्त्रीय संध्या भजन",
    "language": "Hindi",
    "category": "Sandhya Arghya",
    "album": "संध्या स्तुति",
    "artwork": "/logo.svg",
    "duration": 315,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Mai%20He%20Babuji%20Kahas.mp3",
    "isFavorite": false,
    "sourceNote": "डूबते सूर्य के प्रति आभार और कृतज्ञता का शास्त्रीय भजन",
    "lyrics": "अस्ताचल गामी हे सूर्य दिवाकर, शत-शत तुम्हें प्रणाम...\nदिनभर जग को प्राण दिए, विश्राम का यह आयाम!\n\nसंध्या बेला में अर्घ्य समर्पि, मांग रहे आशीष।\nपुनः प्रभात में दर्शन देना, झुका रहे निज शीश..."
  },
  {
    "id": "song-40",
    "title": "अरुणोदय सूर्य वंदना (उषा अरघ)",
    "artist": "शास्त्रीय प्रभात भजन",
    "language": "Hindi",
    "category": "Usha Arghya",
    "album": "प्रभात स्तुति",
    "artwork": "/logo.svg",
    "duration": 325,
    "audioUrl": "https://archive.org/download/kartik-maas-ijoriya/KARTIK%20MAAS%20IJORIYA.mp3",
    "isFavorite": false,
    "sourceNote": "प्रातः काल नई आशा और आरोग्य के प्रदाता भगवान भास्कर की स्तुति",
    "lyrics": "अरुणोदय की दिव्य छटा, पूर्व दिशा मुस्काई...\nअंधकार का नाश हुआ, नई किरण लहराई!\n\nउषा अर्घ्य से पूर्ण हुआ व्रत, बंटी प्रसाद की धार।\nछठी मैया की कृपा से संवरा यह संसार..."
  },
  {
    "id": "song-41",
    "title": "छठी माई के अमर सोहाग",
    "artist": "मैथिली पारंपरिक लोकगीत",
    "language": "Maithili",
    "category": "Maithili Chhath Geet",
    "album": "मिथिला सोहाग गान",
    "artwork": "/logo.svg",
    "duration": 300,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Mora-Bhaiya-Jaiye-La.mp3",
    "isFavorite": false,
    "sourceNote": "अखंड सौभाग्य और संतान सुख के लिए मैथिल ललनाओं का गीत",
    "lyrics": "छठी माई के अमर सोहाग, सिन्दूर माथे चमके...\nपीत वसन पहिरि व्रती, गंगा घाटे दमके!\n\nसूप में मखान, केरा, पान, मखानक माला साजे।\nछठि माईक किरपा सँ कुलक मान विराजे..."
  },
  {
    "id": "song-42",
    "title": "दउरा लचके नइहर से ससुरार",
    "artist": "पारंपरिक भोजपुरी लोकगीत",
    "language": "Bhojpuri",
    "category": "Bhojpuri Chhath Geet",
    "album": "नइहर ससुरार छठ",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Maiya%20Aili.mp3",
    "isFavorite": false,
    "sourceNote": "मायके और ससुराल दोनों में छठ पर्व की उमंग और दउरा की सजीवता",
    "lyrics": "दउरा लचके नइहर से ससुरार, सब सखी मिलि गावें...\nछठी मईया के महिमा अपार, घाटे दीप जलावें!\n\nभईया दउरा उठाए माथे, भौजी सूप सजावें।\nसुरुज देव के किरपा से घर-आँगन महकावें..."
  },
  {
    "id": "song-43",
    "title": "सुरुज बाबा देईं संतान के दीर्घायु",
    "artist": "शारदा सिन्हा (Sharda Sinha)",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "दीर्घायु वरदान",
    "artwork": "/logo.svg",
    "duration": 330,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Kopi-Kopi-Bol-Ke-Suruj-Dev.mp3",
    "isFavorite": true,
    "sourceNote": "पुत्र व पुत्री की दीर्घायु और निरोगी काया की पावन प्रार्थना",
    "lyrics": "सुरुज बाबा देईं संतान के दीर्घायु, निरोगी काया दीहीं...\nहाथ जोड़ी ठाढ़ बानी, विनती स्वीकार करीं!\n\nछठी मईया अँचरा में भर दीहीं खुशहाली।\nकबहूँ ना खाली जाए मईया तोहरी थाली..."
  },
  {
    "id": "song-44",
    "title": "पवित्र नहाय-खाय कद्दू-भात महिमा",
    "artist": "नहाय-खाय विशेष लोकगीत",
    "language": "Bhojpuri",
    "category": "Kharna",
    "album": "प्रथम दिवस नहाय-खाय",
    "artwork": "/logo.svg",
    "duration": 280,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Bhorbe%20Me%20Nadia.mp3",
    "isFavorite": false,
    "sourceNote": "प्रथम दिन नहाय-खाय की शुचिता, कद्दू-भात और सात्विक संकल्प",
    "lyrics": "पवित्र नहाय-खाय कद्दू-भात, चने के दाल सुहावन...\nसेंधा नमक अरवा चावल से, तन-मन भईल पावन!\n\nगंगा स्नान करी व्रती, सात्विक भोजन पाए।\nचार दिन के महापर्व में शुद्धि के दीप जलाए..."
  },
  {
    "id": "song-45",
    "title": "खरना के पावन बेला रसियाव महाप्रसाद",
    "artist": "खरना विशेष लोकगीत",
    "language": "Bhojpuri",
    "category": "Kharna",
    "album": "खरना महाप्रसाद",
    "artwork": "/logo.svg",
    "duration": 295,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Chhath%20Puja.mp3",
    "isFavorite": true,
    "sourceNote": "खरना के दिन रसियाव-रोटी प्रसाद का वितरण एवं निर्जला व्रत आरंभ",
    "lyrics": "खरना के पावन बेला, रसियाव महाप्रसाद...\nगुड़-दूध के खीर बने, मिटे सब अवसाद!\n\nव्रती भोजन पाके अब 36 घंटा निर्जला रहीं।\nछठी माई के शक्ति से कठिन साधना सहीहें..."
  },
  {
    "id": "song-46",
    "title": "सूपवा में दीप जलाय के",
    "artist": "दीया व आरती भजन",
    "language": "Bhojpuri",
    "category": "Chhathi Maiya",
    "album": "दीप ज्योति छठ",
    "artwork": "/logo.svg",
    "duration": 285,
    "audioUrl": "https://archive.org/download/marboresugwadhanushse/Kartik-Mash-Eho-Punit-Mahinawa.mp3",
    "isFavorite": false,
    "sourceNote": "बांस के सूप पर घी का चौमुखी दीया प्रज्ज्वलित करने का भजन",
    "lyrics": "सूपवा में दीप जलाय के, जल में अर्पण कीन्ह...\nछठी मईया दर्शन दीन्हीं, दुःख दरिद्र सब लीन्ह!\n\nझिलमिल-झिलमिल ज्योति चमके, गंगा जल लहराए।\nसुरुज देव के नमन से हर मनोकामना पाए..."
  },
  {
    "id": "song-47",
    "title": "अंगना में तुलसी चउरा सजल बा",
    "artist": "पारंपरिक छठ भजन",
    "language": "Bhojpuri",
    "category": "Traditional Chhath Geet",
    "album": "तुलसी चउरा छठ",
    "artwork": "/logo.svg",
    "duration": 310,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Chhathi%20Maiya.mp3",
    "isFavorite": false,
    "sourceNote": "तुलसी चौरा के समक्ष व्रत का संकल्प और मंगल गीतों का गायन",
    "lyrics": "अंगना में तुलसी चउरा सजल बा, जल ढारे सुहागिन नारी...\nछठी मईया के व्रत ठाने, भक्ति में बलिहारी!\n\nगीत गावे सब मिलजुल के, बाजे मंजीरा ढोल।\nछठ महापर्व के दिन में बोले अमृत बोल..."
  },
  {
    "id": "song-48",
    "title": "जय जय हे सूर्य दिवाकर जय छठी मईया",
    "artist": "संपूर्ण छठ महाआरती",
    "language": "Hindi",
    "category": "Chhathi Maiya",
    "album": "छठ महाआरती",
    "artwork": "/logo.svg",
    "duration": 345,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Lami%20Lami%20Unkhiya.mp3",
    "isFavorite": true,
    "sourceNote": "छठ पर्व की महाआरती जिसे अर्घ्य के बाद संपूर्ण घाट पर गाया जाता है",
    "lyrics": "जय जय हे सूर्य दिवाकर, जय जय छठी मईया...\nभवसागर से पार लगावे, तोहरी पावन नैया!\n\nकंचन थार कपूर की बाती, आरती करें नर-नारी।\nसकल मनोरथ सिद्ध करें, हे मंगलकारी महतारी..."
  },
  {
    "id": "song-49",
    "title": "हे दीनानाथ दीहीं दर्शन घाट पे",
    "artist": "खेसारी लाल यादव (Khesari Lal Yadav)",
    "language": "Bhojpuri",
    "category": "Bhojpuri Chhath Geet",
    "album": "दर्शन दीनानाथ",
    "artwork": "/logo.svg",
    "duration": 290,
    "audioUrl": "https://archive.org/download/maithilichathsongs/Kounche%20Hi%20Pass.mp3",
    "isFavorite": false,
    "sourceNote": "घाट पर सूर्योदय के दर्शन की आतुरता और उल्लास",
    "lyrics": "हे दीनानाथ, दीहीं दर्शन घाट पे, भोर भईल उजियार...\nलाली बिखरी पूर्व दिशा में, गूँजे जय-जयकार!\n\nखेसारी गावे भाव से, माई के पावन गान।\nछठी मईया के आशीष से सफल भईल परमान..."
  },
  {
    "id": "song-50",
    "title": "छठ मईया के आशीष सब परिवार पर",
    "artist": "संपूर्ण महामंगल गान",
    "language": "Traditional",
    "category": "Traditional Chhath Geet",
    "album": "छठ महामंगल",
    "artwork": "/logo.svg",
    "duration": 360,
    "audioUrl": "https://archive.org/download/maithilichathsongs/More%20He%20Sainya.mp3",
    "isFavorite": true,
    "sourceNote": "पारण के उपरांत संपूर्ण परिवार व समाज के कल्याण का महामंगल गान",
    "lyrics": "छठ मईया के आशीष सब परिवार पर, बरसे अमृत धार...\nसुख, शांति, आरोग्य मिले, बढ़े प्रेम-संसार!\n\nपारण कईले व्रती माता, पूर्ण भईल अनुष्ठान।\nछठी माई और सूर्य देव के चरणों में शत-शत प्रणाम..."
  }
];

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
    return this.get<FestivalDay[]>(STORAGE_KEYS.DAYS, INITIAL_DAYS);
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
    const cached = this.get<Song[]>(STORAGE_KEYS.SONGS, []);
    const needsRefresh = !cached || 
      cached.length < INITIAL_SONGS.length || 
      cached.some(s => !s.audioUrl || s.audioUrl.includes('.wav')) || 
      cached[0]?.audioUrl !== 'audio/kaanche_hi_bansh.mp3' ||
      cached[32]?.audioUrl !== INITIAL_SONGS[32]?.audioUrl;

    if (needsRefresh) {
      const imported = (cached || []).filter(s => s.isLocal);
      const combined = [...INITIAL_SONGS, ...imported];
      this.saveSongs(combined);
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
