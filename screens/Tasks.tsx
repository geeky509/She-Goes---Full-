
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, Filter, Search, Loader2 } from 'lucide-react';
import { Category, Task } from '../types';
import { supabase } from '../services/supabaseClient';

const Tasks: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setTasks(data.map((t: any) => ({
        id: t.id,
        title: t.title,
        category: t.category as Category,
        dueDate: t.due_date,
        completed: t.completed,
        priority: t.priority
      })));
    }
    setLoading(false);
  };

  const toggleTask = async (task: Task) => {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', task.id);

    if (!error) {
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
    }
  };

  const filteredTasks = tasks.filter(t => {
    const matchesFilter = filter === 'all' ? true : filter === 'pending' ? !t.completed : t.completed;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-full bg-[#FFF9FA] dark:bg-gray-900 animate-in slide-in-from-right duration-500 pb-32">
      <div className="px-6 pt-12 pb-6 sticky top-0 bg-[#FFF9FA]/80 dark:bg-gray-900/80 backdrop-blur-md z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="playfair text-3xl text-gray-800 dark:text-gray-100">Your Journey</h1>
          <button onClick={fetchTasks} className="p-2 glass rounded-full text-gray-500 dark:text-gray-400">
            <Filter size={20} />
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white/50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F472B6]/20 transition-all shadow-sm dark:text-white"
          />
        </div>

        <div className="flex gap-2 p-1 bg-gray-100/50 dark:bg-gray-800 rounded-2xl">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all capitalize ${
                filter === f ? 'bg-white dark:bg-gray-700 text-[#F472B6] shadow-sm' : 'text-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="text-[#F472B6] animate-spin" size={32} />
          </div>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task)}
              className={`group flex items-center gap-4 p-5 rounded-[1.5rem] border border-white dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all active:scale-[0.98] ${task.completed ? 'opacity-60' : ''}`}
            >
              <div className={`transition-colors ${task.completed ? 'text-green-500' : 'text-gray-300 group-hover:text-[#F472B6]'}`}>
                {task.completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
              </div>
              <div className="flex-1">
                <h4 className={`text-base font-semibold text-gray-800 dark:text-gray-100 ${task.completed ? 'line-through' : ''}`}>
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
                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-gray-400 text-[10px] font-medium">
                      <Clock size={12} />
                      {task.dueDate}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Calendar className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-400 font-medium italic">Nothing matching your search. Time to dream bigger!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
