import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import {
  Users,
  Plus,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  Bot,
  Search,
  Filter,
  Send,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const CommunityPage: React.FC = () => {
  const { communityPosts, upvotePost, addCommunityAnswer, createCommunityPost, student } =
    useStudent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [showAskModal, setShowAskModal] = useState(false);

  // New Question Form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');

  // Inline answer input states keyed by postId
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);

  const filteredPosts = communityPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === 'All' || post.subject === selectedTag;

    return matchesSearch && matchesTag;
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    createCommunityPost(newTitle.trim(), newContent.trim(), newSubject);
    setNewTitle('');
    setNewContent('');
    setShowAskModal(false);
  };

  const handlePostAnswer = (postId: string) => {
    const text = answerInputs[postId]?.trim();
    if (!text) return;

    addCommunityAnswer(postId, text);
    setAnswerInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div id="community-page" className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
              Student Doubt-Solving
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Community Study Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ask difficult questions, exchange intuitive analogies, and verify solutions with AI.
          </p>
        </div>

        <button
          id="ask-community-question-btn"
          onClick={() => setShowAskModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Ask a Question</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'].map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedTag(subject)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                selectedTag === subject
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all space-y-4"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{post.authorName}</span>
                    <span className="text-[10px] text-slate-400">• {post.createdAt}</span>
                  </div>
                  <Badge variant={post.subject === 'Physics' ? 'purple' : 'success'}>
                    {post.subject}
                  </Badge>
                </div>
              </div>

              {/* Upvote Pill */}
              <button
                id={`upvote-post-${post.id}`}
                onClick={() => upvotePost(post.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  post.hasUpvoted
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border-slate-200'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${post.hasUpvoted ? 'fill-white' : ''}`} />
                <span>{post.upvotes}</span>
              </button>
            </div>

            {/* Question Body */}
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading mb-1.5">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Answers Section */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>{post.answers.length} Responses</span>
                </div>

                <button
                  onClick={() =>
                    setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                  }
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  {activeCommentPostId === post.id ? 'Hide Reply Box' : 'Write Answer'}
                </button>
              </div>

              {/* Existing Answers */}
              <div className="space-y-2.5">
                {post.answers.map((ans) => (
                  <div
                    key={ans.id}
                    className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                      ans.isAiVerified
                        ? 'bg-indigo-50/50 border border-indigo-100/80'
                        : 'bg-slate-50 border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={ans.authorAvatar}
                          alt={ans.authorName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-bold text-slate-800">{ans.authorName}</span>
                        <span className="text-[10px] text-slate-400">{ans.createdAt}</span>
                      </div>
                      {ans.isAiVerified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                          <Bot className="w-3 h-3 text-indigo-600" />
                          <span>AI Verified Answer</span>
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{ans.text}</p>
                  </div>
                ))}
              </div>

              {/* Inline Write Answer Form */}
              {activeCommentPostId === post.id && (
                <div className="pt-2 flex gap-2">
                  <input
                    type="text"
                    value={answerInputs[post.id] || ''}
                    onChange={(e) =>
                      setAnswerInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                    }
                    placeholder="Provide a helpful explanation or analogy..."
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handlePostAnswer(post.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handlePostAnswer(post.id)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Post</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Ask the Community a Doubt
            </h3>
            <form onSubmit={handleCreateQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject Domain
                </label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Question Title / Core Concept
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Why does current divide inversely to resistance in parallel branches?"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Details & What You've Tried
                </label>
                <textarea
                  rows={3}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe where you're getting stuck, equations used, or why the concept feels counter-intuitive..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs cursor-pointer"
                >
                  Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
