<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\Project;
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
            Image::create(['name' => 'Code Detail', 'url' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Wireframe Sketch', 'url' => 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Architecture', 'url' => 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop', 'user_id' => 1]),
            Image::create(['name' => 'Collaboration', 'url' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', 'user_id' => 1]),
        ];

        // Portfolio projects
////////////////////////////////////////////////////////////////////////////
        $projectsData = [
            [
                'title' => 'E-Commerce Platform Redesign',
                'lead' => 'Complete overhaul of checkout flow resulting in 40% conversion increase.',
                'date' => '2025-03-01',
                'main_visual_index' => 0,
                'content_images' => [
                    [
                        'image_id' => 5,
                        'description' => 'Our development process emphasized clean code architecture and comprehensive testing. The codebase utilizes TypeScript for type safety, ensuring robust error handling throughout the application. We implemented modern development practices including continuous integration and automated deployment pipelines.'
                    ],
                    [
                        'image_id' => 6,
                        'description' => 'The wireframing phase involved extensive user research and iterative design. We conducted multiple rounds of usability testing with real users to validate our design decisions. Each wireframe was carefully crafted to optimize the user journey and minimize friction points in the checkout process.'
                    ]
                ]
            ],
            [
                'title' => 'Real-Time Analytics Dashboard',
                'lead' => 'Built with React, WebSockets, and D3.js for live data visualization.',
                'date' => '2025-02-15',
                'main_visual_index' => 1,
                'content_images' => [
                    [
                        'image_id' => 5,
                        'description' => 'The dashboard architecture leverages WebSocket connections for real-time data streaming. We optimized rendering performance using React\'s memoization techniques and implemented efficient data transformation pipelines. The system handles thousands of concurrent connections while maintaining sub-100ms latency for data updates.'
                    ]
                ]
            ],
            [
                'title' => 'Design System for SaaS Product',
                'lead' => 'Comprehensive component library with Storybook documentation.',
                'date' => '2025-01-20',
                'main_visual_index' => 2,
                'content_images' => [
                    [
                        'image_id' => 7,
                        'description' => 'Our design system encompasses over 50 reusable components, each meticulously documented with usage examples and accessibility guidelines. We established a clear visual hierarchy and consistent spacing system that scales across different viewport sizes. The component library includes comprehensive prop interfaces and TypeScript definitions for type-safe development.'
                    ],
                    [
                        'image_id' => 8,
                        'description' => 'The architectural foundation of our design system emphasizes modularity and composability. Each component is built with single responsibility in mind, allowing for flexible composition patterns. We implemented a token-based theming system that enables easy customization while maintaining design consistency across the entire product ecosystem.'
                    ]
                ]
            ],
            [
                'title' => 'Mobile Banking Application',
                'lead' => 'Secure cross-platform banking app with biometric authentication and real-time notifications.',
                'date' => '2024-12-10',
                'main_visual_index' => 3,
                'content_images' => [
                    [
                        'image_id' => 6,
                        'description' => 'Security was paramount in our implementation strategy. We integrated industry-standard encryption protocols and implemented biometric authentication using platform-native APIs. The application architecture includes multiple layers of security validation, from client-side checks to server-side verification, ensuring complete protection of sensitive financial data.'
                    ],
                    [
                        'image_id' => 7,
                        'description' => 'The user interface design prioritizes clarity and ease of use for financial transactions. We conducted extensive user testing to optimize the transaction flow, reducing the average completion time by 60%. The design incorporates clear visual feedback at every step, ensuring users maintain confidence throughout their banking operations.'
                    ]
                ]
            ],
            [
                'title' => 'AI-Powered Content Management System',
                'lead' => 'Intelligent CMS with automated content suggestions and SEO optimization.',
                'date' => '2024-11-05',
                'main_visual_index' => 4,
                'content_images' => [
                    [
                        'image_id' => 5,
                        'description' => 'The AI integration leverages natural language processing to provide intelligent content recommendations. Our machine learning models analyze content patterns and user behavior to suggest optimizations for better engagement. The system continuously learns from user interactions, improving its recommendations over time through reinforcement learning techniques.'
                    ],
                    [
                        'image_id' => 8,
                        'description' => 'The content management architecture supports seamless collaboration between team members. We implemented real-time editing capabilities with conflict resolution, version control, and comprehensive audit trails. The system architecture scales efficiently to handle large content volumes while maintaining fast query performance through intelligent caching strategies.'
                    ]
                ]
            ],
            [
                'title' => 'Healthcare Patient Portal',
                'lead' => 'HIPAA-compliant patient portal with appointment scheduling and telemedicine integration.',
                'date' => '2024-10-20',
                'main_visual_index' => 6,
                'content_images' => [
                    [
                        'image_id' => 7,
                        'description' => 'Compliance with healthcare regulations guided every architectural decision. We implemented end-to-end encryption for all patient data, comprehensive audit logging, and role-based access control. The system undergoes regular security audits and penetration testing to ensure continued compliance with HIPAA standards and protect sensitive medical information.'
                    ]
                ]
            ],
            [
                'title' => 'Smart Home Dashboard',
                'lead' => 'IoT device management platform with energy monitoring and automation controls.',
                'date' => '2024-09-15',
                'main_visual_index' => 8,
                'content_images' => [
                    [
                        'image_id' => 5,
                        'description' => 'The IoT integration layer communicates with diverse device protocols including MQTT, Zigbee, and Z-Wave. We implemented a unified abstraction layer that normalizes communication across different device types, enabling seamless control regardless of underlying protocols. The system handles real-time data streaming from hundreds of devices simultaneously.'
                    ],
                    [
                        'image_id' => 6,
                        'description' => 'Energy monitoring features provide granular insights into power consumption patterns. The dashboard visualizes energy usage trends, identifies optimization opportunities, and enables automated scheduling for maximum efficiency. Users can set custom automation rules based on energy thresholds, time schedules, or sensor triggers, creating a truly intelligent home environment.'
                    ]
                ]
            ],
        ];

        foreach ($projectsData as $projectData) {
            $date = $projectData['date'];
            $title = $projectData['title'];
            $slug = $date . '-' . Str::slug($title);

            $contentNodes = [
                [
                    'type' => 'heading',
                    'attrs' => ['level' => 1],
                    'content' => [['type' => 'text', 'text' => $title]]
                ],
                [
                    'type' => 'paragraph',
                    'content' => [
                        [
                            'type' => 'text',
                            'marks' => [['type' => 'bold']],
                            'text' => 'Project Overview: '
                        ],
                        ['type' => 'text', 'text' => $projectData['lead']]
                    ]
                ],
            ];

            // UNIQUE INTROS
            $intros = [
                'E-Commerce Platform Redesign' => 'We transformed a struggling checkout experience into a conversion powerhouse. By analyzing user behavior patterns and eliminating friction points, we increased revenue by millions.',
                'Real-Time Analytics Dashboard' => 'Processing millions of events per second while maintaining responsive UI was our biggest challenge. We built a distributed system that scales horizontally without compromising data accuracy.',
                'Design System for SaaS Product' => 'Creating a unified design language across 20+ product teams required more than just components. We established governance processes and documentation standards that actually get followed.',
                'Mobile Banking Application' => 'Building trust in a mobile banking app means zero tolerance for security vulnerabilities. Every line of code went through multiple security reviews and penetration testing.',
                'AI-Powered Content Management System' => 'Machine learning models need quality data to learn from. We built data pipelines that clean, normalize, and enrich content automatically before feeding it to our AI systems.',
                'Healthcare Patient Portal' => 'HIPAA compliance is non-negotiable in healthcare. We architected the system with security-first principles, implementing zero-trust architecture and end-to-end encryption.',
                'Smart Home Dashboard' => 'Coordinating dozens of IoT devices from different manufacturers required building a universal translation layer. We handle device failures gracefully while maintaining system responsiveness.',
            ];

            $contentNodes[] = [
                'type' => 'paragraph',
                'content' => [['type' => 'text', 'text' => $intros[$title]]]
            ];

            // UNIQUE TECH STACKS
            $techStacks = [
                'E-Commerce Platform Redesign' => [
                    'Frontend: Next.js 14, TypeScript, Tailwind CSS, Framer Motion',
                    'Backend: Node.js, Express, MongoDB, Redis for session management',
                    'Payment: Stripe API, PCI DSS compliance, webhook handling',
                    'Infrastructure: Vercel Edge Functions, MongoDB Atlas, Cloudflare CDN'
                ],
                'Real-Time Analytics Dashboard' => [
                    'Frontend: React 18, TypeScript, D3.js for visualizations, WebSockets',
                    'Backend: Node.js with Socket.io, TimescaleDB for time-series data',
                    'Processing: Apache Kafka, Redis Streams, Bull queue',
                    'Infrastructure: Kubernetes, Prometheus monitoring, Grafana dashboards'
                ],
                'Design System for SaaS Product' => [
                    'Components: React, TypeScript, Radix UI primitives, CSS Modules',
                    'Documentation: Storybook 7, MDX stories, automated visual regression',
                    'Tooling: Turborepo monorepo, Changesets for versioning, ESLint strict config',
                    'Distribution: NPM private registry, automated releases with semantic versioning'
                ],
                'Mobile Banking Application' => [
                    'Mobile: React Native, TypeScript, React Navigation, Reanimated',
                    'Backend: Laravel 11, PostgreSQL, Redis, JWT authentication',
                    'Security: Biometric auth (Touch ID/Face ID), certificate pinning, encrypted storage',
                    'Infrastructure: AWS with VPC isolation, CloudWatch monitoring, automated backups'
                ],
                'AI-Powered Content Management System' => [
                    'Frontend: Vue 3, Composition API, Pinia state management',
                    'Backend: Python FastAPI, PostgreSQL, Celery for background tasks',
                    'AI/ML: OpenAI GPT-4 API, LangChain, vector database (Pinecone)',
                    'Infrastructure: Docker Swarm, Nginx load balancing, S3 for media storage'
                ],
                'Healthcare Patient Portal' => [
                    'Frontend: Angular 16, RxJS, Angular Material, WCAG 2.1 AA compliant',
                    'Backend: .NET 8, SQL Server with Always Encrypted, Azure Key Vault',
                    'Telemedicine: Twilio Video API, WebRTC, encrypted peer connections',
                    'Infrastructure: Azure App Service, Azure SQL with geo-replication, Azure Front Door'
                ],
                'Smart Home Dashboard' => [
                    'Frontend: Svelte 4, TypeScript, Chart.js, MQTT.js client',
                    'Backend: Rust with Actix-web, PostgreSQL, MQTT broker (Mosquitto)',
                    'IoT: Home Assistant integration, Zigbee2MQTT, Z-Wave JS',
                    'Infrastructure: Docker Compose, Raspberry Pi edge computing, Tailscale VPN'
                ],
            ];

            $contentNodes[] = [
                'type' => 'heading',
                'attrs' => ['level' => 2],
                'content' => [['type' => 'text', 'text' => 'Technical Stack']]
            ];

            $contentNodes[] = [
                'type' => 'bulletList',
                'content' => array_map(fn($tech) => [
                    'type' => 'listItem',
                    'content' => [
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => $tech]]
                        ]
                    ]
                ], $techStacks[$title])
            ];

            // UNIQUE KEY FEATURES - DIFFERENT HEADING AND TEXT FOR EACH
            $features = [
                'E-Commerce Platform Redesign' => [
                    'heading' => 'Conversion Optimization Strategy',
                    'text' => 'We implemented one-click checkout with saved payment methods, reducing checkout time from 4 minutes to 45 seconds. A/B testing revealed that showing trust badges increased completion rates by 23%. The cart persistence feature saved abandoned carts automatically and sent strategic email reminders, recovering 18% of lost sales.'
                ],
                'Real-Time Analytics Dashboard' => [
                    'heading' => 'High-Performance Data Processing',
                    'text' => 'The dashboard processes 50,000 events per second with sub-100ms update latency. We use WebSocket connection pooling and server-sent events for efficient browser updates without overwhelming the client. Custom data aggregation pipelines reduce bandwidth by 87% while maintaining complete accuracy.'
                ],
                'Design System for SaaS Product' => [
                    'heading' => 'Developer Experience & Adoption',
                    'text' => 'We created automated tools that detect design system violations in pull requests. Documentation includes live code playgrounds where developers can experiment with components before implementing them. The CLI tool scaffolds new components with TypeScript definitions and Storybook stories in under 10 seconds.'
                ],
                'Mobile Banking Application' => [
                    'heading' => 'Multi-Layer Security Implementation',
                    'text' => 'Every API request uses certificate pinning to prevent man-in-the-middle attacks. Biometric data never leaves the device - we use cryptographic challenges to verify identity. Session tokens expire after 5 minutes of inactivity. All sensitive data is encrypted at rest using AES-256 and in transit using TLS 1.3.'
                ],
                'AI-Powered Content Management System' => [
                    'heading' => 'Contextual AI Recommendations',
                    'text' => 'Our AI analyzes content performance metrics and suggests headlines, meta descriptions, and internal linking opportunities. The system learned from 10,000 high-performing articles to understand what drives engagement. Natural language processing identifies topic gaps and suggests related content to write next.'
                ],
                'Healthcare Patient Portal' => [
                    'heading' => 'Seamless Telemedicine Experience',
                    'text' => 'Video consultations support up to 6 participants with end-to-end encryption. The system automatically transcribes consultations and integrates notes into electronic health records, saving physicians 30 minutes per day. Appointment reminders reduced no-shows by 43% through SMS, email, and push notifications.'
                ],
                'Smart Home Dashboard' => [
                    'heading' => 'Predictive Energy Management',
                    'text' => 'The system learns your usage patterns and automatically optimizes heating, cooling, and lighting schedules. Users save an average of $85/month on energy bills. The dashboard predicts device failures 3 weeks in advance based on consumption anomalies. Smart scheduling shifts high-power activities to off-peak hours automatically.'
                ],
            ];

            $contentNodes[] = [
                'type' => 'heading',
                'attrs' => ['level' => 2],
                'content' => [['type' => 'text', 'text' => $features[$title]['heading']]]
            ];

            $contentNodes[] = [
                'type' => 'paragraph',
                'content' => [['type' => 'text', 'text' => $features[$title]['text']]]
            ];

            // Add content images with descriptions
            foreach ($projectData['content_images'] as $imageData) {
                $imageId = $imageData['image_id'];
                $description = $imageData['description'];

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
                    'content' => [['type' => 'text', 'text' => $description]]
                ];
            }

            // UNIQUE CODE EXAMPLES WITH DIFFERENT IMPLEMENTATIONS
            $codeExamples = [
                'E-Commerce Platform Redesign' => [
                    'heading' => 'Smart Cart Persistence',
                    'language' => 'typescript',
                    'code' => 'export async function saveCartState(userId: string, cart: Cart) {
  const compressed = await compressCart(cart);
  await redis.setex(`cart:${userId}`, 3600 * 24 * 7, compressed);
  
  if (cart.items.length > 0 && cart.lastModified > Date.now() - 600000) {
    await scheduleAbandonmentEmail(userId, cart.total);
  }
  
  return { saved: true, expiresAt: Date.now() + 604800000 };
}'
                ],
                'Real-Time Analytics Dashboard' => [
                    'heading' => 'Event Stream Processing',
                    'language' => 'typescript',
                    'code' => 'class MetricsAggregator {
  private buffer: MetricEvent[] = [];
  
  async process(event: MetricEvent) {
    this.buffer.push(event);
    
    if (this.buffer.length >= 100 || this.shouldFlush()) {
      const aggregated = this.aggregate(this.buffer);
      await this.broadcast(aggregated);
      this.buffer = [];
    }
  }
  
  private aggregate(events: MetricEvent[]): AggregatedMetric {
    return events.reduce((acc, e) => ({
      sum: acc.sum + e.value,
      count: acc.count + 1,
      avg: (acc.sum + e.value) / (acc.count + 1)
    }), { sum: 0, count: 0, avg: 0 });
  }
}'
                ],
                'Design System for SaaS Product' => [
                    'heading' => 'Component Composition Pattern',
                    'language' => 'typescript',
                    'code' => 'export const Card = Object.assign(
  forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border", className)} {...props} />
  )),
  {
    Header: ({ className, ...props }: ComponentProps<"div">) => (
      <div className={cn("p-6", className)} {...props} />
    ),
    Body: ({ className, ...props }: ComponentProps<"div">) => (
      <div className={cn("p-6 pt-0", className)} {...props} />
    ),
    Footer: ({ className, ...props }: ComponentProps<"div">) => (
      <div className={cn("p-6 pt-0", className)} {...props} />
    )
  }
);'
                ],
                'Mobile Banking Application' => [
                    'heading' => 'Biometric Authentication Flow',
                    'language' => 'typescript',
                    'code' => 'export async function secureBiometricAuth(): Promise<SessionToken> {
  const challenge = await api.requestChallenge();
  
  const biometricResult = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate to continue",
    disableDeviceFallback: false,
    requireConfirmation: true
  });
  
  if (!biometricResult.success) {
    throw new AuthError("Biometric authentication failed");
  }
  
  const signature = await signChallenge(challenge);
  const session = await api.verifyAndCreateSession(signature);
  
  await SecureStore.setItemAsync("session_token", session.token, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED
  });
  
  return session;
}'
                ],
                'AI-Powered Content Management System' => [
                    'heading' => 'Content Analysis Pipeline',
                    'language' => 'python',
                    'code' => 'async def analyze_and_suggest(content_id: str) -> Suggestions:
    content = await db.get_content(content_id)
    
    # Generate embeddings for semantic search
    embeddings = await embeddings_model.encode(content.text)
    
    # Find similar high-performing content
    similar = await vector_db.search(
        embeddings, 
        filter={"performance_score": {"$gte": 0.8}},
        limit=10
    )
    
    # Extract patterns from successful content
    patterns = analyze_patterns(similar)
    
    # Generate personalized suggestions
    prompt = build_optimization_prompt(content, patterns)
    suggestions = await llm.generate(prompt, temperature=0.7)
    
    await cache.set(f"suggestions:{content_id}", suggestions, ttl=3600)
    return parse_suggestions(suggestions)'
                ],
                'Healthcare Patient Portal' => [
                    'heading' => 'Encrypted Data Storage',
                    'language' => 'csharp',
                    'code' => 'public class PatientRecordService
{
    private readonly IKeyVaultService _keyVault;
    private readonly ApplicationDbContext _context;
    
    public async Task<Guid> StorePatientRecord(PatientRecord record)
    {
        var dataKey = await _keyVault.GetDataEncryptionKey();
        var encryptedData = AesGcm.Encrypt(
            JsonSerializer.SerializeToUtf8Bytes(record),
            dataKey
        );
        
        var dbRecord = new EncryptedRecord
        {
            Id = Guid.NewGuid(),
            PatientId = record.PatientId,
            EncryptedPayload = encryptedData.Ciphertext,
            Nonce = encryptedData.Nonce,
            Tag = encryptedData.Tag,
            KeyVersion = dataKey.Version
        };
        
        await _context.EncryptedRecords.AddAsync(dbRecord);
        await _context.SaveChangesAsync();
        
        await _auditLog.LogAsync(new AuditEntry
        {
            Action = "CREATE_RECORD",
            ResourceId = dbRecord.Id,
            UserId = record.CreatedBy,
            Timestamp = DateTime.UtcNow
        });
        
        return dbRecord.Id;
    }
}'
                ],
                'Smart Home Dashboard' => [
                    'heading' => 'Device Protocol Abstraction',
                    'language' => 'rust',
                    'code' => 'pub struct DeviceManager {
    mqtt_client: MqttClient,
    state_cache: Arc<RwLock<HashMap<DeviceId, DeviceState>>>,
}

impl DeviceManager {
    pub async fn handle_message(&self, msg: Message) -> Result<()> {
        let device_id = self.parse_device_id(&msg.topic)?;
        let payload: DevicePayload = serde_json::from_slice(&msg.payload)?;
        
        let normalized = self.normalize_payload(payload)?;
        
        let mut cache = self.state_cache.write().await;
        cache.insert(device_id.clone(), normalized.clone());
        drop(cache);
        
        if normalized.requires_action() {
            self.trigger_automation(device_id, normalized).await?;
        }
        
        self.publish_update(device_id, normalized).await?;
        Ok(())
    }
    
    fn normalize_payload(&self, payload: DevicePayload) -> Result<DeviceState> {
        match payload.protocol {
            Protocol::Zigbee => self.parse_zigbee(payload),
            Protocol::Zwave => self.parse_zwave(payload),
            Protocol::Mqtt => self.parse_mqtt(payload),
        }
    }
}'
                ],
            ];

            $contentNodes[] = [
                'type' => 'heading',
                'attrs' => ['level' => 2],
                'content' => [['type' => 'text', 'text' => $codeExamples[$title]['heading']]]
            ];

            $contentNodes[] = [
                'type' => 'codeBlock',
                'attrs' => ['language' => $codeExamples[$title]['language']],
                'content' => [
                    [
                        'type' => 'text',
                        'text' => $codeExamples[$title]['code']
                    ]
                ]
            ];

            // UNIQUE QUOTES
            $quotes = [
                'E-Commerce Platform Redesign' => 'Every second of friction in checkout costs money. We eliminated 15 unnecessary form fields and saw immediate revenue impact. The data proved that simpler is always better.',
                'Real-Time Analytics Dashboard' => 'Building real-time systems is about graceful degradation. When network fails, show cached data. When servers overload, queue updates. Never leave users staring at loading spinners. Design for failure first.',
                'Design System for SaaS Product' => 'A design system fails when developers find it easier to write custom CSS than use the components. Adoption requires education, excellent developer experience, and continuous iteration based on real usage patterns.',
                'Mobile Banking Application' => 'In banking apps, users forgive slow performance but never forgive security breaches. We optimized for security first, then made it fast. Trust is earned through transparency and proven through audits.',
                'AI-Powered Content Management System' => 'AI suggestions are worthless if they interrupt creative flow. We show recommendations in the sidebar, never forcing them into the main editor. The AI serves the writer, not the other way around.',
                'Healthcare Patient Portal' => 'Healthcare software must work for 80-year-olds with limited tech literacy. Large buttons, high contrast, and clear language are not optional. Accessibility is not a feature - it is a requirement.',
                'Smart Home Dashboard' => 'IoT devices fail constantly. Our system assumes devices will disconnect, batteries will die, and networks will drop. The dashboard stays functional regardless. Resilience beats perfection every time.',
            ];

            $contentNodes[] = [
                'type' => 'blockquote',
                'content' => [
                    [
                        'type' => 'paragraph',
                        'content' => [['type' => 'text', 'text' => $quotes[$title]]]
                    ]
                ]
            ];

            // UNIQUE RESULTS WITH DIFFERENT METRICS
            $results = [
                'E-Commerce Platform Redesign' => [
                    '40% increase in conversion rate (from 2.1% to 2.9%)',
                    'Average order value increased by $23 due to better upselling',
                    'Cart abandonment dropped from 71% to 58%',
                    'Mobile conversion rate doubled (1.2% to 2.4%)',
                    'Customer satisfaction score rose from 3.8 to 4.6 out of 5'
                ],
                'Real-Time Analytics Dashboard' => [
                    'Handles 3.2 million events per hour during peak traffic',
                    '99.97% uptime over 6 months in production',
                    'Average page load under 800ms despite complex visualizations',
                    'Reduced infrastructure costs by 35% through efficient data aggregation',
                    'Alert response time improved from 5 minutes to 12 seconds'
                ],
                'Design System for SaaS Product' => [
                    '87% adoption rate across engineering teams within 6 months',
                    'Design-to-development handoff time reduced from 3 days to 4 hours',
                    'UI bugs decreased by 64% due to standardized components',
                    'New feature development 40% faster with reusable components',
                    'Reduced CSS bundle size by 52% through component consolidation'
                ],
                'Mobile Banking Application' => [
                    'Zero security incidents in 18 months of production use',
                    '4.7/5 app store rating with 12,000+ reviews',
                    'Transaction completion time reduced from 90s to 22s',
                    'User authentication 85% faster with biometric support',
                    '92% of users enabled biometric login within first week'
                ],
                'AI-Powered Content Management System' => [
                    'Content creation time reduced by 35% with AI assistance',
                    'SEO scores improved by average of 18 points per article',
                    'AI suggestions accepted in 62% of content pieces',
                    'Organic traffic increased 127% within 4 months',
                    'Writer productivity increased by 2.3 articles per day on average'
                ],
                'Healthcare Patient Portal' => [
                    'Appointment no-shows decreased by 43% with automated reminders',
                    'Patient satisfaction score increased from 3.2 to 4.6 out of 5',
                    'Telemedicine consultations now 31% of total appointments',
                    'Administrative burden reduced saving 200+ hours per month',
                    'Prescription refill requests processed 78% faster'
                ],
                'Smart Home Dashboard' => [
                    'Average energy savings of $1,020 per household annually',
                    'Device failure predictions accurate within 94% confidence',
                    'Response time under 200ms for device control commands',
                    'Supports 250+ device types from 45 manufacturers',
                    'Automated scheduling reduced manual adjustments by 89%'
                ],
            ];

            $contentNodes[] = [
                'type' => 'heading',
                'attrs' => ['level' => 2],
                'content' => [['type' => 'text', 'text' => 'Results & Impact']]
            ];

            $contentNodes[] = [
                'type' => 'orderedList',
                'content' => array_map(fn($result) => [
                    'type' => 'listItem',
                    'content' => [
                        [
                            'type' => 'paragraph',
                            'content' => [['type' => 'text', 'text' => $result]]
                        ]
                    ]
                ], $results[$title])
            ];

            Project::create([
                'title' => $title,
                'lead' => $projectData['lead'],
                'slug' => $slug,
                'content' => json_encode([
                    'type' => 'doc',
                    'content' => $contentNodes
                ]),
                'user_id' => 1,
                'main_visual_id' => $images[$projectData['main_visual_index']]->id,
            ]);
        }

        // Portfolio notes 
        ////////////////////////////////////////////////////////////////////////////
        $notesData = [
            [
                'title' => 'Building a Modern React Dashboard',
                'lead' => 'Exploring component architecture and state management patterns in a complex data visualization project.',
                'date' => '2025-03-15',
                'tags' => ['project'],
                'main_visual_index' => 0,
                'content_image_ids' => [5]
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
                'content_image_ids' => [6]
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