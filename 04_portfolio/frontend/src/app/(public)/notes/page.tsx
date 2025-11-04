import { Grid, GridItem } from "@/components/layout/grid/grid";
import { Text } from "@/components/ui/text/text";
import { fetchApi } from "@/lib/api/api-fetch";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

/**
 * Note data structure from the API
 * Contains all properties needed to display a single note including
 * main visual, tags, and author information
 */
interface Note {
  id: number;
  title: string;
  lead: string;
  slug: string;
  created_at: string;
  main_visual: {
    id: number;
    url: string;
    name: string;
  };
  tags: [{ id: string; name: string }];
  user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  };
}

/**
 * API response wrapper for notes endpoint
 * The API returns data wrapped in a data property
 */
interface NotesResponse {
  data: Note[];
}

/**
 * Fetches all notes from the API with 60-second cache revalidation
 * Uses Next.js ISR to keep content fresh without rebuilding entire site
 *
 * @returns {Promise<NotesResponse['data'] | null>} Array of notes or null if fetch fails
 *
 * Note: toast.error() won't work here as this runs server-side
 * Consider throwing error instead for proper error boundary handling
 */
async function getNotes() {
  const response = await fetchApi<NotesResponse>("notes", {
    next: { revalidate: 60 }, // Revalidate cache every 60 seconds
  });

  if (response.error) {
    toast.error(response.error); // This won't actually work server-side
  }

  return response.data;
}

/**
 * Notes listing page component
 * Server-rendered page displaying all notes in a responsive grid layout
 *
 * Layout:
 * - Hero section: Centered title and description (8 cols on md+)
 * - Notes grid: 1 column mobile, 2 tablet, 3 desktop
 *
 * Each card features:
 * - Golden ratio image (1.618:1)
 * - Title truncated to 1 line
 * - Lead text clamped to 3 lines
 * - Tag pills
 */
export default async function NotesPage() {
  // Fetch notes on server during page generation
  const notes = await getNotes();

  // Early return if no data available
  if (!notes) {
    return <div>No notes found</div>;
  }

  return (
    <>
      {/* Hero section - centered title and description */}
      <Grid className="-px-xs gap-l">
        <GridItem
          span={{ sm: 12, md: 8 }} // Full width mobile, 8 cols on medium+
          offset={{ sm: 0, md: 2 }} // Center on medium+ screens
          className="flex flex-col gap-s mb-xl"
        >
          <Text variant="headline-1" as="h1" className="font-semibold">
            Notes
          </Text>
          <Text variant="headline-5">
            Here you'll find my technical experiments, design musings, and the occasional weekend of
            this as my public workshop— messy, honest, and always evolving.
          </Text>
        </GridItem>
      </Grid>

      {/* Notes grid - responsive 1/2/3 column layout */}
      <Grid className="-px-xs gap-l">
        {notes.data.map((note: Note) => (
          <GridItem key={note.id} span={{ sm: 12, md: 6, lg: 4 }}>
            {/* Note card wrapper - entire card is clickable */}
            <Link href={`/notes/${note.slug}`} className="group block">
              <article className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                {/* 
                  Featured image container
                  Uses golden ratio (1.618:1) for aesthetically pleasing proportions
                */}
                <div className="relative w-full aspect-[1.618/1]">
                  <Image
                    src={note.main_visual.url}
                    alt={note.main_visual.name}
                    fill // Fills parent container
                    className="object-cover" // Crops to fill without distortion
                  />
                </div>

                {/* Card text content */}
                <div className="p-s flex flex-col gap-xs">
                  {/* 
                    Note title
                    Truncates to single line with ellipsis
                    Color changes on card hover via group-hover
                  */}
                  <Text
                    variant="headline-5"
                    as="h3"
                    className="font-semibold group-hover:text-primary-700 transition-colors duration-300 truncate"
                  >
                    {note.title}
                  </Text>

                  {/* 
                    Lead/excerpt text
                    line-clamp-3: Shows max 3 lines with ellipsis
                    min-h: Prevents layout shift when text is short by maintaining 3-line height
                  */}
                  <Text
                    variant="headline-5"
                    className="mb-2xs line-clamp-3 min-h-[calc(var(--text-headline-5--line-height)*3)]"
                  >
                    {note.lead}
                  </Text>

                  {/* Tag pills - wraps to multiple rows if needed */}
                  <div className="flex gap-2 flex-wrap mb-2xs">
                    {note.tags.map((tag) => (
                      <Text
                        key={tag.id}
                        as="span"
                        className="px-xs py-3xs bg-primary-800 text-white rounded-md font-semibold"
                      >
                        {tag.name}
                      </Text>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
