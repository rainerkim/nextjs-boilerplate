import DiaryForm from '@/components/DiaryForm';
import { createDiary } from '@/app/actions';

export default function WritePage() {
    return <DiaryForm action={createDiary} />;
}
