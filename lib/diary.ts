import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'diary.tsv');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

export interface DiaryEntry {
    id: string;
    date: string;
    title: string;
    content: string;
}

// Helper to escape special characters for TSV
function escapeTSV(str: string): string {
    if (!str) return '';
    return str.replace(/\t/g, '\\t').replace(/\n/g, '\\n');
}

// Helper to unescape special characters from TSV
function unescapeTSV(str: string): string {
    if (!str) return '';
    return str.replace(/\\t/g, '\t').replace(/\\n/g, '\n');
}

export async function getEntries(): Promise<DiaryEntry[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        // Skip header if it exists. Let's assume no header or we handle it.
        // We'll use a simple format without header for simplicity, or just check first line.

        return lines.map(line => {
            const [id, date, title, content] = line.split('\t');
            return {
                id,
                date,
                title: unescapeTSV(title),
                content: unescapeTSV(content),
            };
        });
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

export async function getEntry(id: string): Promise<DiaryEntry | undefined> {
    const entries = await getEntries();
    return entries.find(e => e.id === id);
}

export async function saveEntry(entry: DiaryEntry): Promise<void> {
    let entries = await getEntries();
    const index = entries.findIndex(e => e.id === entry.id);

    if (index >= 0) {
        entries[index] = entry;
    } else {
        entries.push(entry);
    }

    // Sort by date desc
    entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    await writeEntries(entries);
}

export async function deleteEntry(id: string): Promise<void> {
    let entries = await getEntries();
    entries = entries.filter(e => e.id !== id);
    await writeEntries(entries);
}

async function writeEntries(entries: DiaryEntry[]): Promise<void> {
    await ensureDataDir();
    const lines = entries.map(e => {
        return `${e.id}\t${e.date}\t${escapeTSV(e.title)}\t${escapeTSV(e.content)}`;
    });

    await fs.writeFile(DATA_FILE, lines.join('\n'), 'utf-8');
}
