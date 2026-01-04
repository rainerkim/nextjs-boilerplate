import DiaryForm from '@/components/DiaryForm';
import { updateDiary } from '@/app/actions';
import { getEntry } from '@/lib/diary';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: PageProps) {
    const { id } = await params;
    const entry = await getEntry(id);

    if (!entry) {
        notFound();
    }

    const updateAction = updateDiary.bind(null, id);

    return (
        <DiaryForm
            action={updateAction}
            initialData={entry}
            isEdit
        />
    );
}
