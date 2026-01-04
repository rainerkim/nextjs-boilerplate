import { getEntry } from '@/lib/diary';
import { notFound } from 'next/navigation';
import { generateColorsFromDate } from '@/lib/utils';
import Link from 'next/link';
import { removeDiary } from '@/app/actions';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: PageProps) {
    const { id } = await params;
    const entry = await getEntry(id);

    if (!entry) {
        notFound();
    }

    const { style, borderStyle } = generateColorsFromDate(entry.date.replace(/-/g, ''));

    return (
        <div
            className="min-h-screen transition-colors duration-700 ease-in-out font-sans flex flex-col items-center p-8"
            style={{ backgroundColor: style.backgroundColor }}
        >
            <div className="w-full max-w-3xl bg-white/60 backdrop-blur-md rounded-[2rem] shadow-xl overflow-hidden animate-fade-in-up">

                {/* Decoration Bar */}
                <div className="h-4 w-full" style={{ backgroundColor: style.color }}></div>

                <div className="p-8 md:p-12">
                    <header className="mb-8 border-b border-black/5 pb-8">
                        <Link
                            href="/"
                            className="inline-block mb-6 text-sm font-bold opacity-50 hover:opacity-100 transition-opacity uppercase tracking-wider"
                            style={{ color: style.color }}
                        >
                            ← Back to List
                        </Link>

                        <div className="flex items-center gap-4 mb-4">
                            <span
                                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/50"
                                style={{ color: style.color }}
                            >
                                Diary
                            </span>
                            <time className="text-sm font-bold opacity-60" style={{ color: style.color }}>
                                {entry.date}
                            </time>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black leading-tight break-keep" style={{ color: style.color }}>
                            {entry.title}
                        </h1>
                    </header>

                    <div className="prose prose-lg max-w-none mb-12">
                        <p className="whitespace-pre-line leading-loose text-gray-800 font-medium opacity-90">
                            {entry.content}
                        </p>
                    </div>

                    <footer className="flex justify-end items-center gap-4 pt-8 border-t border-black/5">
                        <Link
                            href={`/diary/${entry.id}/edit`}
                            className="px-6 py-2.5 rounded-xl font-bold bg-white/50 hover:bg-white text-sm transition-all shadow-sm hover:shadow-md"
                            style={{ color: style.color }}
                        >
                            수정하기
                        </Link>

                        <form action={removeDiary.bind(null, entry.id)}>
                            <button
                                type="submit"
                                className="px-6 py-2.5 rounded-xl font-bold text-white text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                style={{ backgroundColor: style.color }}
                            >
                                삭제하기
                            </button>
                        </form>
                    </footer>
                </div>
            </div>
        </div>
    );
}
