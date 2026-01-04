'use server';

import { deleteEntry, getEntries, getEntry, saveEntry, DiaryEntry } from '@/lib/diary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createDiary(formData: FormData) {
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const content = formData.get('content') as string;

    if (!title || !date || !content) {
        throw new Error('Missing required fields');
    }

    const newEntry: DiaryEntry = {
        id: crypto.randomUUID(),
        date,
        title,
        content,
    };

    await saveEntry(newEntry);
    revalidatePath('/');
    redirect('/');
}

export async function updateDiary(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const content = formData.get('content') as string;

    if (!title || !date || !content) {
        throw new Error('Missing required fields');
    }

    const updatedEntry: DiaryEntry = {
        id,
        date,
        title,
        content,
    };

    await saveEntry(updatedEntry);
    revalidatePath('/');
    revalidatePath(`/diary/${id}`);
    redirect(`/diary/${id}`);
}

export async function removeDiary(id: string) {
    await deleteEntry(id);
    revalidatePath('/');
    redirect('/');
}
