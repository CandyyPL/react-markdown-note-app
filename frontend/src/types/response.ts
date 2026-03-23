import type { Note } from '@/types/note.ts';
import type { Tag } from '@/types/tag.ts';

type NoteData = Note | Note[];
type TagData = Tag | Tag[];

export type Response = {
  data: NoteData | TagData | null,
  error: {
    code: number,
    message: string
  } | null
}