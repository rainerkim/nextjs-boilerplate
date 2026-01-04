import Link from 'next/link';
import { getEntries } from '@/lib/diary';
import { generateColorsFromDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const entries = await getEntries();

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
              My Daily Mood
            </h1>
            <p className="text-gray-500 text-lg">기록하고 싶은 당신의 하루</p>
          </div>
          <Link
            href="/write"
            className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-black rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">오늘의 일기 쓰기</span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-gray-700/50"></div>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <p className="text-gray-400 text-xl font-medium">아직 작성된 일기가 없습니다.</p>
              <p className="text-gray-400 mt-2">첫 번째 이야기를 들려주세요!</p>
            </div>
          ) : (
            entries.map((entry) => {
              const { style, borderStyle } = generateColorsFromDate(entry.date.replace(/-/g, ''));
              return (
                <Link
                  key={entry.id}
                  href={`/diary/${entry.id}`}
                  className="block group"
                >
                  <article
                    className="h-full p-6 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden border"
                    style={{
                      backgroundColor: style.backgroundColor,
                      color: style.color,
                      borderColor: borderStyle.borderColor
                    }}
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <time className="text-sm font-bold opacity-70 mb-4 tracking-wide uppercase">
                        {entry.date}
                      </time>
                      <h2 className="text-2xl font-bold mb-3 line-clamp-2 leading-tight group-hover:underline decoration-2 underline-offset-4">
                        {entry.title}
                      </h2>
                      <p className="text-sm opacity-80 line-clamp-4 leading-relaxed whitespace-pre-line">
                        {entry.content}
                      </p>
                      <div className="mt-auto pt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs font-semibold uppercase tracking-wider border-b border-current pb-0.5">Read More</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}