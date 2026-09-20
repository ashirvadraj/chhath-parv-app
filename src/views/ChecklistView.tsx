import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../services/db';
import { ChecklistItem, FamilyTask } from '../types';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  Circle
} from 'lucide-react';

export const ChecklistView: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'samagri' | 'ghat' | 'family'>('samagri');

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => db.getChecklist());
  const [familyTasks, setFamilyTasks] = useState<FamilyTask[]>(() => db.getFamilyTasks());

  const [newItemText, setNewItemText] = useState('');
  const [assignedTo, setAssignedTo] = useState('स्वयं (Me)');
  const [filterCompleted, setFilterCompleted] = useState<'all' | 'pending' | 'completed'>('all');

  const handleToggleChecklist = (id: string) => {
    const updated = db.toggleChecklistItem(id);
    setChecklist(updated);
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const category = activeTab === 'samagri' ? 'samagri' : 'ghat';
    const updated = db.addChecklistItem({
      checklistId: category,
      text: newItemText.trim(),
      category: category as any,
      isCompleted: false
    });
    setChecklist(updated);
    setNewItemText('');
  };

  const handleDeleteChecklist = (id: string) => {
    const updated = db.deleteChecklistItem(id);
    setChecklist(updated);
  };

  const handleResetChecklist = () => {
    if (confirm('क्या आप इस सूची की सभी मदों को पुनः अपूर्ण (Reset) करना चाहते हैं?')) {
      const updated = db.resetChecklist(activeTab === 'samagri' ? 'samagri' : 'ghat');
      setChecklist(updated);
    }
  };

  const handleToggleFamilyTask = (id: string) => {
    const updated = db.toggleFamilyTask(id);
    setFamilyTasks(updated);
  };

  const handleAddFamilyTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const updated = db.addFamilyTask(newItemText.trim(), assignedTo);
    setFamilyTasks(updated);
    setNewItemText('');
  };

  const handleDeleteFamilyTask = (id: string) => {
    const updated = db.deleteFamilyTask(id);
    setFamilyTasks(updated);
  };

  const currentCategory = activeTab === 'samagri' ? 'samagri' : 'ghat';
  const categoryItems = checklist.filter((item) => item.category === currentCategory);

  const displayedChecklist = categoryItems.filter((item) => {
    if (filterCompleted === 'pending') return !item.isCompleted;
    if (filterCompleted === 'completed') return item.isCompleted;
    return true;
  });

  const displayedFamilyTasks = familyTasks.filter((task) => {
    if (filterCompleted === 'pending') return !task.isCompleted;
    if (filterCompleted === 'completed') return task.isCompleted;
    return true;
  });

  const completedCount = activeTab === 'family' 
    ? familyTasks.filter(t => t.isCompleted).length 
    : categoryItems.filter(i => i.isCompleted).length;
  
  const totalCount = activeTab === 'family' ? familyTasks.length : categoryItems.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-5 pb-24">
      
      {/* View Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-devanagari text-stone-900 dark:text-white flex items-center">
            <CheckSquare className="w-5 h-5 mr-2 text-amber-500" />
            तैयारी एवं चेकलिस्ट
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            पूजा सामग्री, घाट व्यवस्था और पारिवारिक कार्य सूची
          </p>
        </div>

        <button
          onClick={handleResetChecklist}
          className="p-2 rounded-xl bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-stone-400 hover:text-amber-600 transition-colors"
          title="Reset checklist"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-amber-100/60 dark:bg-slate-900 border border-amber-200/50 dark:border-slate-800">
        <button
          onClick={() => { setActiveTab('samagri'); setNewItemText(''); }}
          className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all ${
            activeTab === 'samagri'
              ? 'bg-amber-500 text-stone-950 shadow'
              : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          पूजा सामग्री
        </button>
        <button
          onClick={() => { setActiveTab('ghat'); setNewItemText(''); }}
          className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all ${
            activeTab === 'ghat'
              ? 'bg-amber-500 text-stone-950 shadow'
              : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          घाट तैयारी
        </button>
        <button
          onClick={() => { setActiveTab('family'); setNewItemText(''); }}
          className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all ${
            activeTab === 'family'
              ? 'bg-amber-500 text-stone-950 shadow'
              : 'text-stone-600 dark:text-stone-300'
          }`}
        >
          परिवार के कार्य
        </button>
      </div>

      {/* Progress summary banner */}
      <div className="rounded-2xl bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800 p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-stone-900 dark:text-stone-100 font-devanagari">
            कार्य प्रगति ({completedCount}/{totalCount})
          </span>
          <span className="font-extrabold text-amber-600 dark:text-amber-400">
            {percent}% संपन्न
          </span>
        </div>
        <div className="mt-2 h-2 w-full bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-stone-100 dark:border-slate-800/80 text-xs">
          <span className="text-stone-400 text-[11px]">दिखाएं:</span>
          {(['all', 'pending', 'completed'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterCompleted(filter)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                filterCompleted === filter
                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {filter === 'all' ? 'सभी' : filter === 'pending' ? 'शेष (Pending)' : 'पूर्ण (Done)'}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Item Input Form */}
      <form 
        onSubmit={activeTab === 'family' ? handleAddFamilyTask : handleAddChecklist}
        className="flex flex-col sm:flex-row gap-2 bg-white dark:bg-[#131927] border border-amber-200/60 dark:border-slate-800 p-3 rounded-2xl shadow-sm"
      >
        <input
          type="text"
          placeholder={
            activeTab === 'family'
              ? 'नया पारिवारिक कार्य लिखें (जैसे: ठेकुआ हेतु आटा पिसवाना)...'
              : 'नया सामान जोड़ें (जैसे: पीला सिन्दूर, कपूर)...'
          }
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
        />

        {activeTab === 'family' && (
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-stone-700 dark:text-stone-300"
          >
            <option value="स्वयं (Me)">स्वयं (Me)</option>
            <option value="परिवार (Family)">परिवार (Family)</option>
            <option value="भाई / पिताश्री">भाई / पिताश्री</option>
            <option value="माताजी / दीदी">माताजी / दीदी</option>
          </select>
        )}

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold flex items-center justify-center space-x-1 shadow active:scale-95 transition-transform"
        >
          <Plus className="w-4 h-4" />
          <span>जोड़ें</span>
        </button>
      </form>

      {/* Items List */}
      <div className="space-y-2">
        {activeTab === 'family' ? (
          displayedFamilyTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleFamilyTask(task.id)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                task.isCompleted
                  ? 'bg-amber-50/50 dark:bg-slate-900/40 border-stone-200 dark:border-slate-800 opacity-60'
                  : 'bg-white dark:bg-[#131927] border-amber-200/50 dark:border-slate-800 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center space-x-3 overflow-hidden flex-1 mr-2">
                <button
                  type="button"
                  className="text-amber-500 flex-shrink-0"
                >
                  {task.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 fill-amber-500 text-white" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div className="overflow-hidden">
                  <p className={`text-xs sm:text-sm font-semibold truncate font-devanagari ${
                    task.isCompleted ? 'line-through text-stone-400' : 'text-stone-900 dark:text-stone-100'
                  }`}>
                    {task.title}
                  </p>
                  <span className="inline-block text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                    जिम्मेदारी: {task.assignedTo}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFamilyTask(task.id);
                }}
                className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 transition-colors flex-shrink-0"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          displayedChecklist.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleChecklist(item.id)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                item.isCompleted
                  ? 'bg-amber-50/50 dark:bg-slate-900/40 border-stone-200 dark:border-slate-800 opacity-60'
                  : 'bg-white dark:bg-[#131927] border-amber-200/50 dark:border-slate-800 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center space-x-3 overflow-hidden flex-1 mr-2">
                <button
                  type="button"
                  className="text-amber-500 flex-shrink-0"
                >
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 fill-amber-500 text-white" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <span className={`text-xs sm:text-sm font-semibold truncate font-devanagari ${
                  item.isCompleted ? 'line-through text-stone-400' : 'text-stone-900 dark:text-stone-100'
                }`}>
                  {item.text}
                </span>
              </div>

              {item.isCustom && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChecklist(item.id);
                  }}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 transition-colors flex-shrink-0"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};
