'use client';

import { useState, useEffect } from 'react';
import { generateColorsFromDate, formatDate } from '@/lib/utils';
import Link from 'next/link';

interface DiaryFormProps {
    action: (formData: FormData) => Promise<void>;
    initialData?: {
        date: string;
        title: string;
        content: string;
    };
    isEdit?: boolean;
}

export default function DiaryForm({ action, initialData, isEdit = false }: DiaryFormProps) {
    const [date, setDate] = useState(initialData?.date || formatDate(new Date()));
    const [colors, setColors] = useState(generateColorsFromDate(date.replace(/-/g, '')));

    useEffect(() => {
        // Update colors when date changes
        setColors(generateColorsFromDate(date.replace(/-/g, '')));
    }, [date]);

    return (
        <div
            className="min-h-screen transition-colors duration-700 ease-in-out p-8 flex items-center justify-center font-sans"
            style={{ backgroundColor: colors.style.backgroundColor }}
        >
            <div className="w-full max-w-2xl bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
                <header className="flex items-center justify-between mb-8">
                    <Link href="/" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity" style={{ color: colors.style.color }}>
                        ← Back to List
                    </Link>
                    <h1 className="text-2xl font-bold" style={{ color: colors.style.color }}>
                        {isEdit ? '일기 수정하기' : '새로운 하루 기록하기'}
                    </h1>
                </header>

                <form action={action} className="space-y-6">
                    <div className="group">
                        <label htmlFor="date" className="block text-sm font-semibold mb-2 ml-1" style={{ color: colors.style.color }}>
                            DATE
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/50 border-0 focus:ring-2 focus:ring-opacity-50 transition-all font-mono text-lg"
                            style={{ color: colors.style.color, '--tw-ring-color': colors.style.color } as any}
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="title" className="block text-sm font-semibold mb-2 ml-1" style={{ color: colors.style.color }}>
                            TITLE
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            defaultValue={initialData?.title}
                            placeholder="오늘의 제목을 입력하세요."
                            className="w-full px-4 py-3 rounded-xl bg-white/50 border-0 focus:ring-2 focus:ring-opacity-50 transition-all text-xl font-bold placeholder:text-gray-400/70"
                            style={{ color: colors.style.color, '--tw-ring-color': colors.style.color } as any}
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="content" className="block text-sm font-semibold mb-2 ml-1" style={{ color: colors.style.color }}>
                            STORY
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            required
                            defaultValue={initialData?.content}
                            placeholder="오늘 무슨 일이 있었나요?"
                            rows={10}
                            className="w-full px-4 py-3 rounded-xl bg-white/50 border-0 focus:ring-2 focus:ring-opacity-50 transition-all text-base leading-relaxed placeholder:text-gray-400/70 resize-none"
                            style={{ color: colors.style.color, '--tw-ring-color': colors.style.color } as any}
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                        <Link
                            href="/"
                            className="px-8 py-3 rounded-xl font-medium bg-gray-200/50 hover:bg-gray-300/50 transition-colors"
                            style={{ color: colors.style.color }}
                        >
                            취소
                        </Link>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                            style={{ backgroundColor: colors.style.color }}
                        >
                            {isEdit ? '수정 완료' : '기록 저장'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
