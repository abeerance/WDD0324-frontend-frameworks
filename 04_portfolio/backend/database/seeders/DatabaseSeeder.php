<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Image;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Users
        ////////////////////////////////////////////////////////////////////////////
        User::create([
            'firstName' => 'John',
            'lastName' => 'Doe',
            'email' => 'john.doe@example.com',
            'username' => 'johndoe',
            'password' => bcrypt('password123'),
            'userRole' => 'admin',
            'bio' => 'Full-stack developer with 5+ years of experience.',
        ]);

        User::create([
            'firstName' => 'Sarah',
            'lastName' => 'Miller',
            'email' => 'sarah.miller@example.com',
            'username' => 'sarahmiller',
            'password' => bcrypt('password123'),
            'userRole' => 'member',
            'bio' => 'UX designer passionate about creating intuitive experiences.',
        ]);

        User::create([
            'firstName' => 'David',
            'lastName' => 'Wilson',
            'email' => 'david.wilson@example.com',
            'username' => 'davidwilson',
            'password' => bcrypt('password123'),
            'userRole' => 'member',
            'bio' => 'Content writer and digital marketing specialist.',
        ]);

        // Portfolio tags
        ////////////////////////////////////////////////////////////////////////////
        $tagNames = ['thoughts', 'project', 'play'];

        $tags = [];
        foreach ($tagNames as $name) {
            $tags[$name] = Tag::create(['name' => $name]);
        }

        // Create portfolio images
        ////////////////////////////////////////////////////////////////////////////
        $images = [
            Image::create(['name' => 'React Dashboard', 'url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Code Editor', 'url' => 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Design System', 'url' => 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Mobile App', 'url' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Creative Process', 'url' => 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop', 'user_id' => 1]),

            // Content images for embedding
            Image::create(['name' => 'Code Detail', 'url' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Wireframe Sketch', 'url' => 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop', 'user_id' => 1]),
        ];

        // Portfolio notes
        ////////////////////////////////////////////////////////////////////////////
        $notesData = [
            [
                'title' => 'Building a Modern React Dashboard',
                'lead' => 'Exploring component architecture and state management patterns in a complex data visualization project.',
                'date' => '2025-03-15',
                'tags' => ['project'],
                'main_visual_index' => 0,
                'content_image_ids' => [5] // Code detail image in content
            ],
            [
                'title' => 'Thoughts on Design Systems',
                'lead' => 'Why consistency matters more than creativity in large-scale applications.',
                'date' => '2025-04-22',
                'tags' => ['thoughts'],
                'main_visual_index' => 2,
                'content_image_ids' => []
            ],
            [
                'title' => 'Weekend Game: CSS Art Challenge',
                'lead' => 'Creating pixel art using only CSS properties - no images allowed.',
                'date' => '2025-03-20',
                'tags' => ['play'],
                'main_visual_index' => 4,
                'content_image_ids' => []
            ],
            [
                'title' => 'Mobile-First E-commerce App',
                'lead' => 'From wireframes to production: building a React Native shopping experience.',
                'date' => '2025-02-10',
                'tags' => ['project'],
                'main_visual_index' => 3,
                'content_image_ids' => [6] // Wireframe sketch in content
            ],
            [
                'title' => 'The Psychology of User Interface Design',
                'lead' => 'How cognitive biases influence the way we interact with digital products.',
                'date' => '2025-01-18',
                'tags' => ['thoughts'],
                'main_visual_index' => 1,
                'content_image_ids' => []
            ],
        ];

        foreach ($notesData as $noteData) {
            $date = $noteData['date'];
            $title = $noteData['title'];
            $slug = $date . '-' . Str::slug($title);

            // Build content with embedded images
            $contentNodes = [
                [
                    'type' => 'paragraph',
                    'content' => [['type' => 'text', 'text' => $noteData['lead'] . ' This is sample content for the portfolio.']]
                ]
            ];

            // Add content images to the note content
            foreach ($noteData['content_image_ids'] as $imageId) {
                $contentNodes[] = [
                    'type' => 'image',
                    'attrs' => [
                        'src' => $images[$imageId]->url,
                        'image_id' => $images[$imageId]->id,
                        'alt' => $images[$imageId]->name
                    ]
                ];

                $contentNodes[] = [
                    'type' => 'paragraph',
                    'content' => [['type' => 'text', 'text' => 'Detailed explanation and technical insights continue here...']]
                ];
            }

            $note = Note::create([
                'title' => $title,
                'lead' => $noteData['lead'],
                'slug' => $slug,
                'content' => json_encode([
                    'type' => 'doc',
                    'content' => $contentNodes
                ]),
                'user_id' => 1,
                'main_visual_id' => $images[$noteData['main_visual_index']]->id,
            ]);

            // Attach tags
            foreach ($noteData['tags'] as $tagName) {
                if (isset($tags[$tagName])) {
                    $note->tags()->attach($tags[$tagName]->id);
                }
            }
        }

        // Notes for other users
        $otherNotes = [
            [
                'title' => 'Learning TypeScript',
                'lead' => 'My journey from JavaScript to type-safe development.',
                'date' => '2025-01-15',
                'tags' => ['thoughts'],
                'user_id' => 2,
                'main_visual_index' => 1
            ],
            [
                'title' => 'Vue.js Portfolio Site',
                'lead' => 'Building a personal website with Nuxt.js and Tailwind CSS.',
                'date' => '2025-02-05',
                'tags' => ['project'],
                'user_id' => 3,
                'main_visual_index' => 0
            ],
        ];

        foreach ($otherNotes as $noteData) {
            $date = $noteData['date'];
            $title = $noteData['title'];
            $slug = $date . '-' . Str::slug($title);

            $note = Note::create([
                'title' => $title,
                'lead' => $noteData['lead'],
                'slug' => $slug,
                'content' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => $noteData['lead']]]
                        ]
                    ]
                ]),
                'user_id' => $noteData['user_id'],
                'main_visual_id' => $images[$noteData['main_visual_index']]->id,
            ]);

            foreach ($noteData['tags'] as $tagName) {
                if (isset($tags[$tagName])) {
                    $note->tags()->attach($tags[$tagName]->id);
                }
            }
        }
    }
}
