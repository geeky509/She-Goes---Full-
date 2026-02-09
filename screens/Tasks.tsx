
import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, Filter, Search } from 'lucide-react';
import { Category, Task } from '../types';

const Tasks: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Plan Paris Solo Trip', category: Category.TRAVEL, dueDate: '2024-06-20', completed: false, priority: 'high' },
    { id: '2', title: 'Update LinkedIn Headline', category: Category.CAREER, dueDate: '2024-05-15', completed: true, priority: 'medium' },
    { id: '3', title: 'Morning Affirmations', category: Category.SELF, dueDate: '2024-05-10', completed: false, priority: 'medium' },
    { id: '4', title: 'Review Savings Account', category: Category.MONEY, dueDate: '2024-05-12', completed: false, priority: 'low' },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !t.completed;
    return t.completed;
  });

  return (
    <div className="flex flex-col min-h-full bg-[#FFF9FA] animate-in slide-in-from-right duration-500">
      <div className="px-6 pt-12 pb-6 sticky top-0 bg-[#FFF9FA]/80 backdrop-blur-md z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="playfair text-3xl text-gray-800">Your Journey</h1>
          <button className="p-2 glass rounded-full text-gray-500">
            <Filter size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search actions..."
            className="w-full h-12 pl-12 pr-4 bg-white/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F472B6]/20 transition-all shadow-sm"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 p-1 bg-gray-100/50 rounded-2xl">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all capitalize ${
                filter === f ? 'bg-white text-[#F472B6] shadow-sm' : 'text-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-4 pb-32">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className={`group flex items-center gap-4 p-5 rounded-[1.5rem] border border-white bg-white shadow-sm transition-all active:scale-[0.98] ${task.completed ? 'opacity-60 grayscale-[0.5]' : ''}`}
            >
              <div className={`transition-colors ${task.completed ? 'text-green-500' : 'text-gray-300 group-hover:text-[#F472B6]'}`}>
                {task.completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
              </div>
              <div className="flex-1">
                <h4 className={`text-base font-semibold text-gray-800 ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    task.category === Category.TRAVEL ? 'bg-blue-100 text-blue-600' :
                    task.category === Category.CAREER ? 'bg-purple-100 text-purple-600' :
                    task.category === Category.MONEY ? 'bg-yellow-100 text-yellow-600' :
                    'bg-pink-100 text-pink-600'
                  }`}>
                    {task.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400 text-[10px] font-medium">
                    <Clock size={12} />
                    {task.dueDate}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-400 font-medium italic">Nothing here yet. Time to dream!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
