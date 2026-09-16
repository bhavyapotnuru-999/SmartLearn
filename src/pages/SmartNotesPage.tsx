import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { aiService, GenerateNotesOptions } from '../services/aiService';
import { SmartNote } from '../types';
import {
  FileText,
  UploadCloud,
  FileCheck,
  Sparkles,
  Copy,
  Download,
  Bookmark,
  Bot,
  Trash2,
  CheckCircle2,
  ListOrdered,
  HelpCircle,
  Layers,
  X
} from 'lucide-react';

export const SmartNotesPage: React.FC = () => {
  const { notes, addNote, deleteNote, navigateTo, addToast } = useStudent();

  // Upload simulation state
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>({
    name: 'Physics_Ch4_Circuits_Lecture.pdf',
    size: '3.4 MB'
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(100);

  // Generation Checklist options
  const [options, setOptions] = useState<GenerateNotesOptions>({
    summary: true,
    definitions: true,
    formulas: true,
    questions: true,
    flashcards: true,
    quiz: true,
    revisionChecklist: true
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [activeNote, setActiveNote] = useState<SmartNote>(notes[0]);
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      simulateFileUpload(file.name, `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      simulateFileUpload(file.name, `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
    }
  };

  const simulateFileUpload = (name: string, size: string) => {
    setIsUploading(true);
    setUploadProgress(20);
    setTimeout(() => setUploadProgress(60), 250);
    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
      setSelectedFile({ name, size });
      addToast({
        title: 'Document Uploaded',
        description: `Ready to synthesize notes for ${name}`,
        type: 'success'
      });
    }, 600);
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;
    setIsGenerating(true);

    try {
      const generated = await aiService.summarizeDocument(selectedFile.name, options);
      addNote(generated);
      setActiveNote(generated);
    } catch {
      addToast({
        title: 'Note generation issue',
        description: 'Using cached structured template.',
        type: 'info'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyNotes = () => {
    if (!activeNote) return;
    navigator.clipboard.writeText(`${activeNote.title}\n\n${activeNote.summary}`);
    addToast({
      title: 'Copied to Clipboard',
      description: 'Full structured notes text ready to paste.',
      type: 'success'
    });
  };

  const handleDownload = () => {
    addToast({
      title: 'Downloaded PDF Summary',
      description: `Downloaded "${activeNote?.title || 'SmartNotes'}.pdf"`,
      type: 'success'
    });
  };

  const handleAskAiAboutSection = (sectionName: string) => {
    navigateTo('tutor');
  };

  return (
    <div id="smart-notes-page" className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/60">
            Document Synthesis
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          Turn your study material into smart notes.
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload a PDF, document, or presentation to generate high-yield summaries, formulas, flashcards, and checklists.
        </p>
      </div>

      {/* Upload Box & Customization Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Drag & Drop Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-indigo-600" />
              <span>Upload Study Document</span>
            </h3>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[190px] ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
              }`}
              onClick={() => document.getElementById('file-upload-hidden')?.click()}
            >
              <input
                id="file-upload-hidden"
                type="file"
                accept=".pdf,.docx,.ppt,.pptx,.txt"
                className="hidden"
                onChange={handleFileInput}
              />

              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-3 shadow-2xs">
                <FileText className="w-6 h-6" />
              </div>

              <p className="text-sm font-bold text-slate-800">
                Drag and drop study materials here, or browse files
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports PDF, PPTX, DOCX, lecture notes up to 25MB
              </p>

              <button
                type="button"
                className="mt-4 px-4 py-2 bg-white hover:bg-slate-50 text-indigo-600 text-xs font-bold rounded-xl border border-indigo-200 shadow-2xs transition-colors"
              >
                + Upload Material
              </button>
            </div>

            {/* Selected File Status */}
            {selectedFile && (
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 truncate">{selectedFile.name}</p>
                    <span className="text-[10px] text-slate-400">{selectedFile.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Remove file"
                  aria-label="Remove uploaded file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Selectable Generation Options */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Select Generation Output</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Choose modules to include in your personalized smart notes.
            </p>

            <div className="space-y-2 text-xs">
              {[
                { key: 'summary', label: 'Executive Summary', icon: FileText },
                { key: 'definitions', label: 'Important Definitions', icon: ListOrdered },
                { key: 'formulas', label: 'Key Governing Formulas', icon: Sparkles },
                { key: 'questions', label: 'Questions & Answers', icon: HelpCircle },
                { key: 'flashcards', label: 'Active Recall Flashcards', icon: Layers },
                { key: 'revisionChecklist', label: 'Exam Revision Checklist', icon: CheckCircle2 }
              ].map((item) => {
                const isChecked = options[item.key as keyof GenerateNotesOptions];
                return (
                  <label
                    key={item.key}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/70 hover:bg-slate-50 cursor-pointer select-none transition-colors"
                  >
                    <div className="flex items-center gap-2.5 font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            [item.key]: e.target.checked
                          }))
                        }
                        className="w-4 h-4 text-indigo-600 rounded-md border-slate-300 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            id="generate-notes-btn"
            onClick={handleGenerate}
            disabled={isGenerating || !selectedFile}
            className="w-full mt-5 py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl shadow-xs shadow-purple-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing your material...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Notes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Document Reader / Viewer */}
      {activeNote && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
          {/* Document Action Toolbar */}
          <div className="px-6 py-4 border-b border-slate-200/80 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {activeNote.subject}
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-heading mt-1">
                {activeNote.title}
              </h2>
              <span className="text-xs text-slate-400">Created: {activeNote.createdAt}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyNotes}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy</span>
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={() => handleAskAiAboutSection('electricity')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl border border-indigo-200 transition-colors cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ask AI About This</span>
              </button>
            </div>
          </div>

          {/* Document Content View */}
          <div className="p-6 sm:p-10 space-y-8 max-w-4xl mx-auto">
            {/* 1. Summary Section */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  <span>Executive Summary</span>
                </h3>
                <button
                  onClick={() => handleAskAiAboutSection('summary')}
                  className="text-[11px] text-indigo-600 hover:underline"
                >
                  Clarify with AI →
                </button>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                {activeNote.summary}
              </p>
            </section>

            {/* 2. Important Definitions */}
            {activeNote.definitions && activeNote.definitions.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span>Important Definitions</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeNote.definitions.map((def) => (
                    <div
                      key={def.term}
                      className="p-3.5 bg-purple-50/40 rounded-xl border border-purple-100 space-y-1"
                    >
                      <h4 className="text-xs font-bold text-purple-950 font-heading">{def.term}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{def.definition}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Formulas */}
            {activeNote.formulas && activeNote.formulas.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Key Governing Formulas</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeNote.formulas.map((f) => (
                    <div
                      key={f.name}
                      className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-1"
                    >
                      <span className="text-[10px] text-indigo-300 font-mono block uppercase">
                        {f.name}
                      </span>
                      <p className="text-base font-mono font-bold text-emerald-400 py-1">
                        {f.formula}
                      </p>
                      <p className="text-[11px] text-slate-300">{f.explanation}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. Interactive Flashcards Module */}
            {activeNote.flashcards && activeNote.flashcards.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Active Recall Flashcards</span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    Card {activeFlashcardIndex + 1} of {activeNote.flashcards.length}
                  </span>
                </div>

                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="bg-amber-50/50 hover:bg-amber-50 border-2 border-amber-200/80 rounded-2xl p-8 text-center min-h-[160px] flex flex-col items-center justify-center cursor-pointer transition-all shadow-xs select-none"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-2">
                    {isFlipped ? 'Answer (Click to flip)' : 'Question / Prompt (Click to reveal)'}
                  </span>
                  <p className="text-base font-bold text-slate-900 max-w-lg">
                    {isFlipped
                      ? activeNote.flashcards[activeFlashcardIndex].back
                      : activeNote.flashcards[activeFlashcardIndex].front}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setActiveFlashcardIndex((prev) =>
                        prev > 0 ? prev - 1 : activeNote.flashcards.length - 1
                      );
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                  >
                    ← Previous Card
                  </button>

                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setActiveFlashcardIndex((prev) =>
                        prev < activeNote.flashcards.length - 1 ? prev + 1 : 0
                      );
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-lg"
                  >
                    Next Card →
                  </button>
                </div>
              </section>
            )}

            {/* 5. Revision Checklist */}
            {activeNote.revisionChecklist && activeNote.revisionChecklist.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Exam Revision Checklist</span>
                </h3>
                <div className="space-y-2">
                  {activeNote.revisionChecklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-800"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          item.done ? 'text-emerald-500' : 'text-slate-300'
                        }`}
                      />
                      <span className={item.done ? 'line-through text-slate-400' : ''}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {/* Saved Notes Library Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold text-slate-900 font-heading">
          Your Saved Smart Notes Library
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNote(note)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeNote?.id === note.id
                  ? 'bg-indigo-50/40 border-indigo-300 shadow-xs'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {note.subject}
                  </span>
                  <span className="text-[10px] text-slate-400">{note.createdAt}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{note.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{note.summary}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-indigo-600 font-semibold hover:underline">
                  Open Document →
                </span>
                {notes.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
