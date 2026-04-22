import React, { useState, useMemo, useEffect } from 'react';
import { Search, Github, Twitter, Linkedin, Globe, User, LayoutGrid, Settings, Youtube, Gamepad2, Palette, Video, Share2, Copy, Check } from 'lucide-react';

// সব পেশার মানুষের ডামি ডেটা
const initialUsers = [
  {
    id: 1,
    name: "ফাহিম 'Ninja' রহমান",
    role: "Pro Gamer & Streamer",
    bio: "ভ্যালোরেন্ট এবং পাবজি লাভার। প্রতিদিন রাত ৮টায় টুইচে স্ট্রিম করি। আসুন একসাথে খেলি!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fahim&style=circle",
    tags: ["Gaming", "Valorant", "Streamer", "PC Build"],
    links: { youtube: "#", twitter: "#", portfolio: "#" },
    iconType: "gaming"
  },
  {
    id: 2,
    name: "সাদিয়া ইসলাম",
    role: "Digital Artist & Illustrator",
    bio: "ডিজিটাল ক্যানভাসে রং নিয়ে খেলতে ভালোবাসি। ফ্রিল্যান্স ইলাস্ট্রেশন এবং ক্যারেক্টার ডিজাইন করি।",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sadia&style=circle",
    tags: ["Digital Art", "Procreate", "Illustration"],
    links: { portfolio: "#", twitter: "#" },
    iconType: "art"
  },
  {
    id: 3,
    name: "তানভীর আহমেদ",
    role: "Tech YouTuber",
    bio: "নতুন গ্যাজেট রিভিউ, পিসি বিল্ড গাইড আর টেক নিউজ নিয়ে ভিডিও বানাই। সাবস্ক্রাইব করতে ভুলবেন না।",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvir&style=circle",
    tags: ["YouTube", "Tech Review", "Video Editing"],
    links: { youtube: "#", twitter: "#", portfolio: "#" },
    iconType: "video"
  },
  {
    id: 4,
    name: "শিহাব উদ্দীন",
    role: "Software Engineer",
    bio: "কোড লিখে সমস্যা সমাধান করা আমার কাজ। ওপেন সোর্স এবং নতুন প্রযুক্তি নিয়ে এক্সপেরিমেন্ট করতে পছন্দ করি।",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shihab&style=circle",
    tags: ["JavaScript", "Python", "Problem Solving"],
    links: { github: "#", linkedin: "#", portfolio: "#" },
    iconType: "dev"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [saveStatus, setSaveStatus] = useState(null); // 'saved' or null
  
  // লোকাল স্টোরেজ থেকে ডেটা নেওয়ার চেষ্টা
  const loadSavedProfile = () => {
    try {
      const saved = localStorage.getItem('myPortfolioData');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("ডেটা লোড করতে সমস্যা:", e);
    }
    return {
      name: "তোমার নাম",
      role: "পেশা (যেমন: গেমার, ডিজাইনার)",
      bio: "নিজের সম্পর্কে ২-৩ লাইনে কিছু লেখো...",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You&style=circle",
      tags: "Gaming, Art, Design", 
      links: { github: "", linkedin: "", youtube: "", portfolio: "" }
    };
  };

  const [myProfile, setMyProfile] = useState(loadSavedProfile);

  // প্রোফাইল সেভ করার ফাংশন
  const handleSaveProfile = () => {
    try {
      localStorage.setItem('myPortfolioData', JSON.stringify(myProfile));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000); // ৩ সেকেন্ড পর মেসেজ মুছে যাবে
    } catch (e) {
      console.error("ডেটা সেভ করতে সমস্যা:", e);
    }
  };

  // সার্চ লজিক
  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return initialUsers.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.role.toLowerCase().includes(query) ||
      user.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // ট্যাগগুলোকে কমা দিয়ে ভাগ করে এরে বানানো
  const myTagsArray = myProfile.tags.split(',').map(t => t.trim()).filter(t => t !== "");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-indigo-500/30">
      
      {/* ন্যাভিগেশন বার */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <LayoutGrid size={18} className="text-white" />
            </div>
            DevCards
          </div>
          
          <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'explore' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
            >
              <Search size={16} />
              <span className="hidden sm:inline">এক্সপ্লোর</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'profile' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
            >
              <User size={16} />
              <span className="hidden sm:inline">আমার প্রোফাইল</span>
            </button>
          </div>
        </div>
      </nav>

      {/* মেইন কন্টেন্ট */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* এক্সপ্লোর ট্যাব (ফিড) */}
        {activeTab === 'explore' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-white mb-4">ডিজিটাল আইডেন্টিটি খুঁজুন</h1>
              
              <p className="text-slate-400 max-w-xl mx-auto mb-8">
                গেমার, ক্রিয়েটর, ডেভেলপার—সবার পোর্টফোলিও এক জায়গায়। সার্চ করে আপনার পছন্দের মানুষের সাথে কানেক্ট করুন।
              </p>
              
              <div className="max-w-md mx-auto relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="নাম, পেশা বা আগ্রহ (যেমন: Gaming) দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white px-12 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-xl shadow-black/20"
                />
              </div>
            </div>

            {/* ইউজার কার্ড গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <UserCard key={user.id} user={user} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-slate-500">
                  <p>কাউকে পাওয়া যায়নি। অন্য কিছু লিখে খুঁজুন।</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* আমার প্রোফাইল ট্যাব (এডিটর) */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-white">আপনার কার্ড তৈরি করুন</h1>
              <p className="text-slate-400 mt-2">আপনার তথ্য দিন, সেভ করুন এবং লিংক শেয়ার করুন। ডেটা আপনার ব্রাউজারেই সেভ থাকবে।</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* ফর্ম সেকশন */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
                
                {/* সেভ সাকসেস মেসেজ */}
                {saveStatus === 'saved' && (
                  <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 animate-in fade-in zoom-in duration-300">
                    <Check size={16} /> সেভ হয়েছে!
                  </div>
                )}

                <div className="flex items-center gap-2 mb-6 text-white font-semibold">
                  <Settings size={20} className="text-indigo-400" />
                  এডিট ইনফরমেশন
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">পূর্ণ নাম</label>
                    <input 
                      type="text" 
                      value={myProfile.name}
                      onChange={(e) => setMyProfile({...myProfile, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">পেশা বা টাইটেল</label>
                    <input 
                      type="text" 
                      value={myProfile.role}
                      onChange={(e) => setMyProfile({...myProfile, role: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">বায়ো (Bio)</label>
                    <textarea 
                      rows="3"
                      value={myProfile.bio}
                      onChange={(e) => setMyProfile({...myProfile, bio: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">আগ্রহ / স্কিল ট্যাগ (কমা দিয়ে লিখুন)</label>
                    <input 
                      type="text" 
                      value={myProfile.tags}
                      onChange={(e) => setMyProfile({...myProfile, tags: e.target.value})}
                      placeholder="যেমন: Gaming, Vlogging, React"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <label className="block text-sm font-medium text-slate-400 mb-3">সোশ্যাল লিংকস</label>
                    <div className="space-y-3">
                       <div className="flex items-center gap-3">
                        <Youtube size={20} className="text-slate-500" />
                        <input 
                          type="text" 
                          value={myProfile.links.youtube}
                          onChange={(e) => setMyProfile({...myProfile, links: {...myProfile.links, youtube: e.target.value}})}
                          placeholder="ইউটিউব চ্যানেল লিংক"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Github size={20} className="text-slate-500" />
                        <input 
                          type="text" 
                          value={myProfile.links.github}
                          onChange={(e) => setMyProfile({...myProfile, links: {...myProfile.links, github: e.target.value}})}
                          placeholder="গিটহাব লিংক (ঐচ্ছিক)"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Linkedin size={20} className="text-slate-500" />
                        <input 
                          type="text" 
                          value={myProfile.links.linkedin}
                          onChange={(e) => setMyProfile({...myProfile, links: {...myProfile.links, linkedin: e.target.value}})}
                          placeholder="লিঙ্কডইন লিংক (ঐচ্ছিক)"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleSaveProfile}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/25 flex justify-center items-center gap-2"
                  >
                    ব্রাউজারে সেভ করুন
                  </button>
                </div>
              </div>

              {/* লাইভ প্রিভিউ সেকশন */}
              <div>
                <div className="sticky top-24">
                  <h3 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">লাইভ কার্ড প্রিভিউ</h3>
                  <UserCard user={{...myProfile, tags: myTagsArray}} isPreview={true} />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// কার্ড কম্পোনেন্ট
function UserCard({ user, isPreview = false }) {
  
  // ডামি শেয়ার ফাংশন
  const handleShare = () => {
    alert("লিংক কপি করা হয়েছে! (এটি একটি ডেমো)");
  };

  // আইকন সিলেক্ট করার লজিক
  const getRoleIcon = () => {
    if(!user.iconType) return null;
    switch(user.iconType) {
      case 'gaming': return <Gamepad2 size={16} className="text-indigo-400" />;
      case 'art': return <Palette size={16} className="text-indigo-400" />;
      case 'video': return <Video size={16} className="text-indigo-400" />;
      case 'dev': return <LayoutGrid size={16} className="text-indigo-400" />;
      default: return null;
    }
  };

  return (
    <div className={`group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden flex flex-col h-full ${isPreview ? 'shadow-2xl shadow-indigo-500/5 border-indigo-500/30' : ''}`}>
      
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-all"></div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-4">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 object-cover p-1"
          />
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              {user.name || "নাম নেই"}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              {getRoleIcon()}
              <p className="text-sm text-indigo-400/80 font-medium">{user.role || "পেশা নেই"}</p>
            </div>
          </div>
        </div>
        
        {/* শেয়ার বাটন */}
        <button onClick={handleShare} className="text-slate-500 hover:text-white bg-slate-800/50 hover:bg-slate-700 p-2 rounded-lg transition-colors">
          <Share2 size={16} />
        </button>
      </div>
      
      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 relative z-10 flex-grow">
        {user.bio || "কোনো বায়ো দেওয়া হয়নি।"}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {user.tags && user.tags.map((tag, index) => (
          <span 
            key={index} 
            className="px-2.5 py-1 text-xs font-medium bg-slate-800/80 text-slate-300 rounded-md border border-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-800 relative z-10">
        <div className="flex gap-3">
          {user.links?.youtube && (
             <a href="#" title="YouTube" className="text-slate-500 hover:text-red-500 hover:scale-110 transition-all">
               <Youtube size={18} />
             </a>
          )}
          {(user.links?.github !== undefined || user.links?.github === "") && (
             <a href="#" title="GitHub" className="text-slate-500 hover:text-white hover:scale-110 transition-all">
               <Github size={18} />
             </a>
          )}
          {user.links?.twitter && (
            <a href="#" title="Twitter" className="text-slate-500 hover:text-blue-400 hover:scale-110 transition-all">
              <Twitter size={18} />
            </a>
          )}
          {(user.links?.linkedin !== undefined || user.links?.linkedin === "") && (
            <a href="#" title="LinkedIn" className="text-slate-500 hover:text-blue-500 hover:scale-110 transition-all">
              <Linkedin size={18} />
            </a>
          )}
        </div>
        
        <button className="text-xs font-medium text-white bg-slate-800 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 group/btn">
          <Globe size={14} className="group-hover/btn:animate-pulse" />
          ভিজিট করুন
        </button>
      </div>
    </div>
  );
}
