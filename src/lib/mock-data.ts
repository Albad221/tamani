import {
  User, Class, Subject, Course, Grade, Homework, Submission,
  Attendance, Conversation, Message, Document, MediaContent,
  Reaction, Comment, Category, Notification, Invoice
} from '@/types';

// Users
export const users: User[] = [
  {
    id: 'student-1',
    email: 'amina.kone@tamani.ci',
    firstName: 'Amina',
    lastName: 'Koné',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop',
    phone: '+225 07 00 00 01',
    dateOfBirth: '2000-03-15',
    classId: 'class-1',
    createdAt: '2024-09-01',
    lastLoginAt: '2024-11-29',
    isActive: true,
  },
  {
    id: 'student-2',
    email: 'kouame.yao@tamani.ci',
    firstName: 'Kouamé',
    lastName: 'Yao',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    phone: '+225 07 00 00 02',
    dateOfBirth: '1999-07-22',
    classId: 'class-1',
    createdAt: '2024-09-01',
    lastLoginAt: '2024-11-29',
    isActive: true,
  },
  {
    id: 'student-3',
    email: 'fatou.diallo@tamani.ci',
    firstName: 'Fatou',
    lastName: 'Diallo',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    phone: '+225 07 00 00 03',
    dateOfBirth: '2000-01-10',
    classId: 'class-1',
    createdAt: '2024-09-01',
    lastLoginAt: '2024-11-28',
    isActive: true,
  },
  {
    id: 'student-4',
    email: 'ibrahim.traore@tamani.ci',
    firstName: 'Ibrahim',
    lastName: 'Traoré',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    phone: '+225 07 00 00 04',
    dateOfBirth: '1998-11-05',
    classId: 'class-2',
    createdAt: '2024-09-01',
    lastLoginAt: '2024-11-29',
    isActive: true,
  },
  {
    id: 'teacher-1',
    email: 'prof.mensah@tamani.ci',
    firstName: 'Kofi',
    lastName: 'Mensah',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    phone: '+225 07 00 00 10',
    subjects: ['subject-1', 'subject-2'],
    createdAt: '2023-09-01',
    lastLoginAt: '2024-11-29',
    isActive: true,
  },
  {
    id: 'teacher-2',
    email: 'prof.ouattara@tamani.ci',
    firstName: 'Mariam',
    lastName: 'Ouattara',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    phone: '+225 07 00 00 11',
    subjects: ['subject-3', 'subject-4'],
    createdAt: '2023-09-01',
    lastLoginAt: '2024-11-29',
    isActive: true,
  },
  {
    id: 'teacher-3',
    email: 'prof.bamba@tamani.ci',
    firstName: 'Seydou',
    lastName: 'Bamba',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
    phone: '+225 07 00 00 12',
    subjects: ['subject-5', 'subject-6'],
    createdAt: '2023-09-01',
    lastLoginAt: '2024-11-28',
    isActive: true,
  },
  {
    id: 'admin-1',
    email: 'admin@tamani.ci',
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
    phone: '+225 07 00 00 00',
    createdAt: '2023-01-01',
    lastLoginAt: '2024-11-29',
    isActive: true,
  },
];

// Classes (Business School programs)
export const classes: Class[] = [
  {
    id: 'class-1',
    name: 'MBA 1 - Management',
    level: 'MBA 1ère année',
    year: '2024-2025',
    studentIds: ['student-1', 'student-2', 'student-3'],
    mainTeacherId: 'teacher-1',
  },
  {
    id: 'class-2',
    name: 'MBA 2 - Finance',
    level: 'MBA 2ème année',
    year: '2024-2025',
    studentIds: ['student-4'],
    mainTeacherId: 'teacher-2',
  },
  {
    id: 'class-3',
    name: 'Bachelor 3 - Marketing Digital',
    level: 'Bachelor 3ème année',
    year: '2024-2025',
    studentIds: [],
    mainTeacherId: 'teacher-3',
  },
  {
    id: 'class-4',
    name: 'Executive MBA',
    level: 'Executive',
    year: '2024-2025',
    studentIds: [],
    mainTeacherId: 'teacher-1',
  },
];

// Subjects (Business School curriculum)
export const subjects: Subject[] = [
  { id: 'subject-1', name: 'Finance d\'Entreprise', code: 'FIN', coefficient: 5, color: '#4F6AF0' },
  { id: 'subject-2', name: 'Comptabilité & Contrôle de Gestion', code: 'CCG', coefficient: 4, color: '#10B981' },
  { id: 'subject-3', name: 'Marketing Stratégique', code: 'MKT', coefficient: 4, color: '#F59E0B' },
  { id: 'subject-4', name: 'Management & Leadership', code: 'MGT', coefficient: 4, color: '#8B5CF6' },
  { id: 'subject-5', name: 'Business English', code: 'ENG', coefficient: 3, color: '#EC4899' },
  { id: 'subject-6', name: 'Droit des Affaires', code: 'DRT', coefficient: 3, color: '#06B6D4' },
  { id: 'subject-7', name: 'Économie & Stratégie', code: 'ECO', coefficient: 4, color: '#84CC16' },
  { id: 'subject-8', name: 'Digital & Innovation', code: 'DIG', coefficient: 3, color: '#F43F5E' },
  { id: 'subject-9', name: 'Entrepreneuriat', code: 'ENT', coefficient: 4, color: '#A855F7' },
  { id: 'subject-10', name: 'Ressources Humaines', code: 'RH', coefficient: 3, color: '#14B8A6' },
];

// Courses (Weekly Schedule)
export const courses: Course[] = [
  // Monday
  { id: 'course-1', title: 'Finance d\'Entreprise', subjectId: 'subject-1', teacherId: 'teacher-1', classId: 'class-1', room: 'Amphi A', startTime: '08:30', endTime: '10:30', dayOfWeek: 1, color: '#4F6AF0' },
  { id: 'course-2', title: 'Marketing Stratégique', subjectId: 'subject-3', teacherId: 'teacher-2', classId: 'class-1', room: 'Salle B12', startTime: '10:45', endTime: '12:45', dayOfWeek: 1, color: '#F59E0B' },
  { id: 'course-3', title: 'Business English', subjectId: 'subject-5', teacherId: 'teacher-3', classId: 'class-1', room: 'Salle 105', startTime: '14:00', endTime: '16:00', dayOfWeek: 1, color: '#EC4899' },
  // Tuesday
  { id: 'course-4', title: 'Comptabilité & Contrôle de Gestion', subjectId: 'subject-2', teacherId: 'teacher-1', classId: 'class-1', room: 'Salle Info 1', startTime: '08:30', endTime: '10:30', dayOfWeek: 2, color: '#10B981' },
  { id: 'course-5', title: 'Management & Leadership', subjectId: 'subject-4', teacherId: 'teacher-2', classId: 'class-1', room: 'Salle 301', startTime: '10:45', endTime: '12:45', dayOfWeek: 2, color: '#8B5CF6' },
  { id: 'course-6', title: 'Droit des Affaires', subjectId: 'subject-6', teacherId: 'teacher-3', classId: 'class-1', room: 'Amphi B', startTime: '14:00', endTime: '16:00', dayOfWeek: 2, color: '#06B6D4' },
  // Wednesday
  { id: 'course-7', title: 'Économie & Stratégie', subjectId: 'subject-7', teacherId: 'teacher-1', classId: 'class-1', room: 'Amphi A', startTime: '08:30', endTime: '10:30', dayOfWeek: 3, color: '#84CC16' },
  { id: 'course-8', title: 'Digital & Innovation', subjectId: 'subject-8', teacherId: 'teacher-2', classId: 'class-1', room: 'Salle Info 2', startTime: '10:45', endTime: '12:45', dayOfWeek: 3, color: '#F43F5E' },
  { id: 'course-9', title: 'Entrepreneuriat', subjectId: 'subject-9', teacherId: 'teacher-3', classId: 'class-1', room: 'Incubateur', startTime: '14:00', endTime: '17:00', dayOfWeek: 3, color: '#A855F7' },
  // Thursday
  { id: 'course-10', title: 'Finance d\'Entreprise', subjectId: 'subject-1', teacherId: 'teacher-1', classId: 'class-1', room: 'Salle 204', startTime: '08:30', endTime: '10:30', dayOfWeek: 4, color: '#4F6AF0' },
  { id: 'course-11', title: 'Ressources Humaines', subjectId: 'subject-10', teacherId: 'teacher-2', classId: 'class-1', room: 'Salle B12', startTime: '10:45', endTime: '12:45', dayOfWeek: 4, color: '#14B8A6' },
  { id: 'course-12', title: 'Business English', subjectId: 'subject-5', teacherId: 'teacher-3', classId: 'class-1', room: 'Salle 105', startTime: '14:00', endTime: '16:00', dayOfWeek: 4, color: '#EC4899' },
  // Friday
  { id: 'course-13', title: 'Marketing Stratégique', subjectId: 'subject-3', teacherId: 'teacher-2', classId: 'class-1', room: 'Amphi A', startTime: '08:30', endTime: '10:30', dayOfWeek: 5, color: '#F59E0B' },
  { id: 'course-14', title: 'Étude de cas - Consulting', subjectId: 'subject-4', teacherId: 'teacher-1', classId: 'class-1', room: 'Salle 301', startTime: '10:45', endTime: '12:45', dayOfWeek: 5, color: '#8B5CF6' },
  { id: 'course-15', title: 'Conférence Professionnelle', subjectId: 'subject-9', teacherId: 'teacher-3', classId: 'class-1', room: 'Amphi Principal', startTime: '14:00', endTime: '16:00', dayOfWeek: 5, color: '#A855F7' },
];

// Grades
export const grades: Grade[] = [
  { id: 'grade-1', studentId: 'student-1', subjectId: 'subject-1', teacherId: 'teacher-1', value: 16, coefficient: 2, type: 'exam', title: 'Partiel - Analyse Financière', date: '2024-10-15', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-2', studentId: 'student-1', subjectId: 'subject-1', teacherId: 'teacher-1', value: 14, coefficient: 1, type: 'quiz', title: 'QCM - Ratios financiers', date: '2024-10-28', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-3', studentId: 'student-1', subjectId: 'subject-1', teacherId: 'teacher-1', value: 17, coefficient: 2, type: 'exam', title: 'Étude de cas - Valorisation entreprise', date: '2024-11-12', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-4', studentId: 'student-1', subjectId: 'subject-2', teacherId: 'teacher-1', value: 15, coefficient: 2, type: 'exam', title: 'Partiel - Comptabilité analytique', date: '2024-10-18', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-5', studentId: 'student-1', subjectId: 'subject-2', teacherId: 'teacher-1', value: 18, coefficient: 1, type: 'homework', title: 'Projet - Tableau de bord', date: '2024-10-25', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-6', studentId: 'student-1', subjectId: 'subject-3', teacherId: 'teacher-2', value: 15, coefficient: 2, type: 'exam', title: 'Plan Marketing - Oral', date: '2024-10-20', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-7', studentId: 'student-1', subjectId: 'subject-3', teacherId: 'teacher-2', value: 16, coefficient: 1, type: 'oral', title: 'Pitch produit', date: '2024-11-05', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-8', studentId: 'student-1', subjectId: 'subject-4', teacherId: 'teacher-2', value: 14, coefficient: 2, type: 'exam', title: 'Étude de cas - Leadership', date: '2024-10-22', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-9', studentId: 'student-1', subjectId: 'subject-5', teacherId: 'teacher-3', value: 16, coefficient: 1, type: 'oral', title: 'TOEIC Speaking', date: '2024-10-30', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-10', studentId: 'student-1', subjectId: 'subject-5', teacherId: 'teacher-3', value: 15, coefficient: 2, type: 'exam', title: 'Business Writing', date: '2024-11-15', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-11', studentId: 'student-1', subjectId: 'subject-9', teacherId: 'teacher-3', value: 17, coefficient: 2, type: 'homework', title: 'Business Plan Startup', date: '2024-11-20', semester: 1, academicYear: '2024-2025' },
  // Grades for student-2
  { id: 'grade-12', studentId: 'student-2', subjectId: 'subject-1', teacherId: 'teacher-1', value: 12, coefficient: 2, type: 'exam', title: 'Partiel - Analyse Financière', date: '2024-10-15', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-13', studentId: 'student-2', subjectId: 'subject-1', teacherId: 'teacher-1', value: 11, coefficient: 1, type: 'quiz', title: 'QCM - Ratios financiers', date: '2024-10-28', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-14', studentId: 'student-2', subjectId: 'subject-2', teacherId: 'teacher-1', value: 14, coefficient: 2, type: 'exam', title: 'Partiel - Comptabilité analytique', date: '2024-10-18', semester: 1, academicYear: '2024-2025' },
];

// Homework
export const homework: Homework[] = [
  {
    id: 'hw-1',
    title: 'Analyse financière - Cas Cofina',
    description: 'Réaliser une analyse financière complète de Cofina sur les 3 derniers exercices. Inclure ratios, diagnostic et recommandations.',
    subjectId: 'subject-1',
    teacherId: 'teacher-1',
    classId: 'class-1',
    dueDate: '2024-12-02',
    publishedAt: '2024-11-25',
    attachments: ['rapport-annuel-orange-ci.pdf'],
    maxScore: 20,
    type: 'individual',
  },
  {
    id: 'hw-2',
    title: 'Business Plan - Projet Startup',
    description: 'Élaborer un business plan complet pour votre projet de startup. Executive summary, étude de marché, stratégie, prévisions financières sur 3 ans.',
    subjectId: 'subject-9',
    teacherId: 'teacher-3',
    classId: 'class-1',
    dueDate: '2024-12-15',
    publishedAt: '2024-11-20',
    attachments: ['template-business-plan.docx', 'guide-financier.xlsx'],
    maxScore: 20,
    type: 'group',
  },
  {
    id: 'hw-3',
    title: 'Étude de marché - Secteur au choix',
    description: 'Réaliser une étude de marché complète sur un secteur d\'activité en Afrique de l\'Ouest. Analyse PESTEL, Porter, SWOT.',
    subjectId: 'subject-3',
    teacherId: 'teacher-2',
    classId: 'class-1',
    dueDate: '2024-12-10',
    publishedAt: '2024-11-22',
    attachments: [],
    maxScore: 20,
    type: 'group',
  },
  {
    id: 'hw-4',
    title: 'Présentation orale - Case Study McKinsey',
    description: 'Préparer une présentation de 20 minutes sur la résolution du cas McKinsey "African Retail Expansion". Slides + oral.',
    subjectId: 'subject-4',
    teacherId: 'teacher-2',
    classId: 'class-1',
    dueDate: '2024-12-08',
    publishedAt: '2024-11-18',
    attachments: ['case-study-mckinsey.pdf'],
    maxScore: 20,
    type: 'group',
  },
  {
    id: 'hw-5',
    title: 'TOEIC Preparation - Mock Test',
    description: 'Compléter le test TOEIC blanc en ligne. Score minimum attendu: 750 points.',
    subjectId: 'subject-5',
    teacherId: 'teacher-3',
    classId: 'class-1',
    dueDate: '2024-12-05',
    publishedAt: '2024-11-26',
    attachments: [],
    maxScore: 990,
    type: 'individual',
  },
];

// Submissions
export const submissions: Submission[] = [
  { id: 'sub-1', homeworkId: 'hw-1', studentId: 'student-1', status: 'pending', files: [], },
  { id: 'sub-2', homeworkId: 'hw-2', studentId: 'student-1', status: 'pending', files: [], },
  { id: 'sub-3', homeworkId: 'hw-3', studentId: 'student-1', submittedAt: '2024-11-28', status: 'submitted', files: ['etude-marche-fintech.pdf', 'presentation.pptx'], textContent: 'Étude de marché sur le secteur Fintech en Afrique de l\'Ouest.' },
  { id: 'sub-4', homeworkId: 'hw-4', studentId: 'student-1', status: 'pending', files: [], },
  { id: 'sub-5', homeworkId: 'hw-1', studentId: 'student-2', submittedAt: '2024-11-30', status: 'submitted', files: ['analyse-orange-kouame.pdf'], },
  { id: 'sub-6', homeworkId: 'hw-2', studentId: 'student-2', status: 'pending', files: [], },
];

// Attendance
export const attendance: Attendance[] = [
  { id: 'att-1', studentId: 'student-1', courseId: 'course-1', date: '2024-11-25', status: 'present' },
  { id: 'att-2', studentId: 'student-1', courseId: 'course-2', date: '2024-11-25', status: 'present' },
  { id: 'att-3', studentId: 'student-1', courseId: 'course-3', date: '2024-11-25', status: 'late', minutesLate: 10 },
  { id: 'att-4', studentId: 'student-1', courseId: 'course-4', date: '2024-11-26', status: 'present' },
  { id: 'att-5', studentId: 'student-1', courseId: 'course-5', date: '2024-11-26', status: 'absent', justification: 'Entretien stage' },
  { id: 'att-6', studentId: 'student-1', courseId: 'course-6', date: '2024-11-26', status: 'excused', justification: 'Entretien stage - Deloitte', validatedBy: 'admin-1', validatedAt: '2024-11-26' },
  { id: 'att-7', studentId: 'student-2', courseId: 'course-1', date: '2024-11-25', status: 'present' },
  { id: 'att-8', studentId: 'student-2', courseId: 'course-2', date: '2024-11-25', status: 'absent' },
];

// Conversations
export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['student-1', 'teacher-1'],
    type: 'private',
    createdAt: '2024-11-20',
    lastMessageAt: '2024-11-28',
  },
  {
    id: 'conv-2',
    participantIds: ['student-1', 'teacher-2'],
    type: 'private',
    createdAt: '2024-11-15',
    lastMessageAt: '2024-11-25',
  },
  {
    id: 'conv-3',
    participantIds: ['student-1', 'student-2', 'student-3'],
    type: 'group',
    title: 'Équipe Business Plan Fintech',
    createdAt: '2024-11-18',
    lastMessageAt: '2024-11-29',
  },
];

// Messages
export const messages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'student-1',
    content: 'Bonjour Professeur, j\'ai une question concernant la méthode DCF pour la valorisation d\'entreprise.',
    attachments: [],
    sentAt: '2024-11-28T10:30:00',
    readBy: ['student-1', 'teacher-1'],
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'teacher-1',
    content: 'Bonjour Amina, oui bien sûr. Qu\'est-ce qui vous pose problème exactement dans le calcul du DCF?',
    attachments: [],
    sentAt: '2024-11-28T11:15:00',
    readBy: ['teacher-1', 'student-1'],
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'student-1',
    content: 'Je n\'arrive pas à déterminer le taux d\'actualisation (WACC) pour Cofina. J\'hésite entre plusieurs approches pour estimer le coût des fonds propres.',
    attachments: [],
    sentAt: '2024-11-28T11:30:00',
    readBy: ['student-1', 'teacher-1'],
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    senderId: 'teacher-1',
    content: 'Pour le WACC, utilisez le modèle CAPM avec un beta sectoriel télécoms. Ajoutez une prime de risque pays pour la Côte d\'Ivoire (environ 4-5%). Je vous envoie un fichier Excel avec les formules.',
    attachments: ['wacc-template.xlsx'],
    sentAt: '2024-11-28T14:00:00',
    readBy: ['teacher-1'],
  },
  {
    id: 'msg-5',
    conversationId: 'conv-3',
    senderId: 'student-2',
    content: 'Salut l\'équipe! On avance bien sur le business plan. J\'ai terminé la partie étude de marché Fintech.',
    attachments: [],
    sentAt: '2024-11-29T09:00:00',
    readBy: ['student-2', 'student-3'],
  },
  {
    id: 'msg-6',
    conversationId: 'conv-3',
    senderId: 'student-3',
    content: 'Super! Je finis les projections financières ce soir. On se retrouve demain en salle de travail à 14h pour la mise en commun?',
    attachments: [],
    sentAt: '2024-11-29T09:15:00',
    readBy: ['student-3'],
  },
];

// Documents
export const documents: Document[] = [
  {
    id: 'doc-1',
    title: 'Cours - Finance d\'Entreprise - Chapitre 1 à 4',
    description: 'Analyse financière, ratios, diagnostic financier et introduction à la valorisation.',
    fileUrl: '/documents/cours-finance-entreprise.pdf',
    fileType: 'pdf',
    type: 'course',
    subjectId: 'subject-1',
    uploadedById: 'teacher-1',
    visibility: 'class',
    classIds: ['class-1', 'class-2'],
    createdAt: '2024-09-15',
    downloadCount: 87,
  },
  {
    id: 'doc-2',
    title: 'Template - Business Plan',
    description: 'Modèle complet de business plan avec guide de rédaction et exemples.',
    fileUrl: '/documents/template-business-plan.docx',
    fileType: 'docx',
    type: 'resource',
    subjectId: 'subject-9',
    uploadedById: 'teacher-3',
    visibility: 'public',
    classIds: [],
    createdAt: '2024-10-01',
    downloadCount: 156,
  },
  {
    id: 'doc-3',
    title: 'Case Study - McKinsey African Retail',
    description: 'Étude de cas officielle McKinsey sur l\'expansion retail en Afrique.',
    fileUrl: '/documents/case-study-mckinsey.pdf',
    fileType: 'pdf',
    type: 'exercise',
    subjectId: 'subject-4',
    uploadedById: 'teacher-2',
    visibility: 'class',
    classIds: ['class-1'],
    createdAt: '2024-11-18',
    downloadCount: 45,
  },
  {
    id: 'doc-4',
    title: 'Règlement des études 2024-2025',
    description: 'Règlement académique, modalités d\'évaluation et charte éthique.',
    fileUrl: '/documents/reglement-etudes.pdf',
    fileType: 'pdf',
    type: 'official',
    uploadedById: 'admin-1',
    visibility: 'public',
    classIds: [],
    createdAt: '2024-09-01',
    downloadCount: 312,
  },
  {
    id: 'doc-5',
    title: 'Slides - Marketing Digital & Growth Hacking',
    description: 'Présentation complète sur les stratégies de marketing digital et growth.',
    fileUrl: '/documents/marketing-digital.pptx',
    fileType: 'pptx',
    type: 'course',
    subjectId: 'subject-8',
    uploadedById: 'teacher-2',
    visibility: 'class',
    classIds: ['class-1', 'class-3'],
    createdAt: '2024-10-15',
    downloadCount: 98,
  },
  {
    id: 'doc-6',
    title: 'Excel - Modèle financier Startup',
    description: 'Template Excel pour projections financières startup (P&L, Cash-flow, Valorisation).',
    fileUrl: '/documents/modele-financier-startup.xlsx',
    fileType: 'xlsx',
    type: 'resource',
    subjectId: 'subject-9',
    uploadedById: 'teacher-1',
    visibility: 'public',
    classIds: [],
    createdAt: '2024-10-20',
    downloadCount: 203,
  },
];

// Categories for Media
export const categories: Category[] = [
  { id: 'cat-1', name: 'Vie du Campus', slug: 'vie-campus', description: 'Actualités et événements de l\'école', icon: 'school', color: '#4F6AF0' },
  { id: 'cat-2', name: 'Business & Finance', slug: 'business-finance', description: 'Analyses et insights business', icon: 'chart', color: '#10B981' },
  { id: 'cat-3', name: 'Entrepreneuriat', slug: 'entrepreneuriat', description: 'Startups, innovation et success stories', icon: 'rocket', color: '#F59E0B' },
  { id: 'cat-4', name: 'Carrière & Stages', slug: 'carriere', description: 'Conseils carrière et opportunités', icon: 'briefcase', color: '#8B5CF6' },
  { id: 'cat-5', name: 'Tech & Innovation', slug: 'tech', description: 'Actualités tech et digital', icon: 'cpu', color: '#EC4899' },
  { id: 'cat-6', name: 'Alumni', slug: 'alumni', description: 'Témoignages et parcours d\'anciens', icon: 'users', color: '#14B8A6' },
];

// Media Content
export const mediaContent: MediaContent[] = [
  {
    id: 'media-1',
    title: 'Forum Entreprises 2024 - Reportage',
    description: 'Retour en images sur le Forum Entreprises Tamani 2024. Plus de 50 entreprises présentes et des centaines d\'opportunités de stage et d\'emploi.',
    type: 'video',
    mediaUrl: 'https://example.com/video1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    authorId: 'student-1',
    coAuthorIds: ['student-2'],
    categoryId: 'cat-1',
    tags: ['forum', 'entreprises', 'recrutement', 'stages'],
    status: 'published',
    validatedById: 'teacher-2',
    publishedAt: '2024-11-25',
    viewCount: 456,
    featured: true,
  },
  {
    id: 'media-2',
    title: 'Podcast: De Tamani à Goldman Sachs - Parcours de Yaya',
    description: 'Interview exclusive avec Yaya Diallo, promo 2019, aujourd\'hui analyste chez Goldman Sachs à Londres. Ses conseils pour réussir en finance.',
    type: 'podcast',
    mediaUrl: 'https://example.com/podcast1.mp3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=400&fit=crop',
    authorId: 'student-3',
    coAuthorIds: [],
    categoryId: 'cat-6',
    tags: ['alumni', 'finance', 'carrière', 'international'],
    status: 'published',
    validatedById: 'teacher-1',
    publishedAt: '2024-11-20',
    viewCount: 312,
    featured: true,
  },
  {
    id: 'media-3',
    title: 'Infographie: Les métiers de la Finance en 2024',
    description: 'Panorama complet des métiers de la finance: salaires, compétences requises, évolutions de carrière.',
    type: 'infographic',
    mediaUrl: '/media/metiers-finance.png',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    authorId: 'student-1',
    coAuthorIds: [],
    categoryId: 'cat-2',
    subjectId: 'subject-1',
    tags: ['finance', 'carrière', 'salaires', 'métiers'],
    status: 'published',
    validatedById: 'teacher-1',
    publishedAt: '2024-11-18',
    viewCount: 523,
    featured: true,
  },
  {
    id: 'media-4',
    title: 'Article: Fintech en Afrique - Opportunités et Défis',
    description: 'Analyse approfondie du marché Fintech africain. Mobile money, néobanques, et opportunités d\'investissement.',
    type: 'article',
    mediaUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    authorId: 'student-2',
    coAuthorIds: ['student-4'],
    categoryId: 'cat-5',
    tags: ['fintech', 'afrique', 'mobile money', 'startup'],
    status: 'published',
    validatedById: 'teacher-1',
    publishedAt: '2024-11-15',
    viewCount: 287,
    featured: false,
  },
  {
    id: 'media-5',
    title: 'Vidéo: Comment réussir son entretien en cabinet de conseil',
    description: 'Guide complet pour préparer les entretiens en conseil: case study, fit interview, et tips des recruteurs.',
    type: 'video',
    mediaUrl: 'https://example.com/video2.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
    authorId: 'student-4',
    coAuthorIds: [],
    categoryId: 'cat-4',
    subjectId: 'subject-4',
    tags: ['conseil', 'entretien', 'McKinsey', 'BCG', 'carrière'],
    status: 'published',
    validatedById: 'teacher-2',
    publishedAt: '2024-11-10',
    viewCount: 198,
    featured: false,
  },
  {
    id: 'media-6',
    title: 'Résumé: Les 5 forces de Porter appliquées au e-commerce',
    description: 'Analyse stratégique complète du secteur e-commerce avec le modèle des 5 forces de Porter.',
    type: 'summary',
    mediaUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    authorId: 'student-3',
    coAuthorIds: [],
    categoryId: 'cat-2',
    subjectId: 'subject-7',
    tags: ['stratégie', 'Porter', 'e-commerce', 'analyse'],
    status: 'pending',
    publishedAt: undefined,
    viewCount: 0,
    featured: false,
  },
  {
    id: 'media-7',
    title: 'Success Story: Comment j\'ai levé 500K€ pour ma startup',
    description: 'Témoignage de Sarah, MBA 2022, qui a levé des fonds pour sa startup FoodTech. Pitch deck, investisseurs, et leçons apprises.',
    type: 'podcast',
    mediaUrl: 'https://example.com/podcast2.mp3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    authorId: 'student-1',
    coAuthorIds: ['student-2'],
    categoryId: 'cat-3',
    tags: ['startup', 'levée de fonds', 'entrepreneuriat', 'alumni'],
    status: 'published',
    validatedById: 'teacher-3',
    publishedAt: '2024-11-08',
    viewCount: 245,
    featured: false,
  },
];

// Reactions
export const reactions: Reaction[] = [
  { id: 'react-1', contentId: 'media-1', userId: 'student-2', type: 'like' },
  { id: 'react-2', contentId: 'media-1', userId: 'student-3', type: 'inspiring' },
  { id: 'react-3', contentId: 'media-1', userId: 'student-4', type: 'like' },
  { id: 'react-4', contentId: 'media-3', userId: 'student-2', type: 'useful' },
  { id: 'react-5', contentId: 'media-3', userId: 'student-3', type: 'useful' },
  { id: 'react-6', contentId: 'media-3', userId: 'student-4', type: 'useful' },
  { id: 'react-7', contentId: 'media-3', userId: 'teacher-1', type: 'useful' },
  { id: 'react-8', contentId: 'media-2', userId: 'student-1', type: 'inspiring' },
  { id: 'react-9', contentId: 'media-2', userId: 'student-4', type: 'useful' },
];

// Comments
export const comments: Comment[] = [
  { id: 'com-1', contentId: 'media-1', userId: 'student-3', text: 'Super reportage! Le stand Deloitte était vraiment intéressant.', createdAt: '2024-11-25T15:30:00' },
  { id: 'com-2', contentId: 'media-1', userId: 'teacher-2', text: 'Excellent travail de couverture! Très professionnel.', createdAt: '2024-11-25T16:00:00' },
  { id: 'com-3', contentId: 'media-3', userId: 'student-2', text: 'Merci pour cette infographie! Ça m\'aide beaucoup pour mon orientation.', createdAt: '2024-11-19T10:00:00' },
  { id: 'com-4', contentId: 'media-3', userId: 'teacher-1', text: 'Très bonne synthèse du marché. Données à jour et bien sourcées.', createdAt: '2024-11-19T14:30:00' },
  { id: 'com-5', contentId: 'media-2', userId: 'student-1', text: 'Interview inspirante! J\'aimerais aussi faire carrière à l\'international.', createdAt: '2024-11-21T09:00:00' },
  { id: 'com-6', contentId: 'media-5', userId: 'student-3', text: 'Les tips sur le case study sont vraiment utiles. Merci!', createdAt: '2024-11-11T11:00:00' },
];

// Notifications
export const notifications: Notification[] = [
  { id: 'notif-1', userId: 'student-1', type: 'grade', title: 'Nouvelle note', body: 'Vous avez reçu 17/20 en Business Plan Startup', link: '/dashboard/grades', read: false, createdAt: '2024-11-29T08:00:00' },
  { id: 'notif-2', userId: 'student-1', type: 'homework', title: 'Devoir à rendre', body: 'Analyse financière - Cas Cofina - Dans 3 jours', link: '/dashboard/homework/hw-1', read: false, createdAt: '2024-11-29T07:00:00' },
  { id: 'notif-3', userId: 'student-1', type: 'message', title: 'Nouveau message', body: 'Prof. Mensah vous a répondu', link: '/dashboard/messages/conv-1', read: true, createdAt: '2024-11-28T14:00:00' },
  { id: 'notif-4', userId: 'student-1', type: 'media', title: 'Contenu mis en avant', body: 'Votre infographie sur les métiers de la finance est featured!', link: '/dashboard/media/media-3', read: true, createdAt: '2024-11-18T12:00:00' },
  { id: 'notif-5', userId: 'student-1', type: 'attendance', title: 'Retard enregistré', body: 'Retard de 10 min en Business English', link: '/dashboard/attendance', read: true, createdAt: '2024-11-25T16:00:00' },
  { id: 'notif-6', userId: 'student-1', type: 'message', title: 'Équipe Business Plan', body: 'Kouamé a posté dans le groupe', link: '/dashboard/messages/conv-3', read: false, createdAt: '2024-11-29T09:00:00' },
];

// Invoices
export const invoices: Invoice[] = [
  { id: 'inv-1', studentId: 'student-1', amount: 1500000, description: 'Frais de scolarité MBA - 1er semestre', dueDate: '2024-10-15', status: 'paid', paidAt: '2024-10-10', paymentMethod: 'Virement bancaire', academicYear: '2024-2025', semester: 1 },
  { id: 'inv-2', studentId: 'student-1', amount: 1500000, description: 'Frais de scolarité MBA - 2ème semestre', dueDate: '2025-02-15', status: 'pending', academicYear: '2024-2025', semester: 2 },
  { id: 'inv-3', studentId: 'student-1', amount: 75000, description: 'Cotisation BDE & Associations', dueDate: '2024-11-30', status: 'overdue', academicYear: '2024-2025', semester: 1 },
  { id: 'inv-4', studentId: 'student-1', amount: 150000, description: 'Voyage d\'études - Marrakech', dueDate: '2025-01-15', status: 'pending', academicYear: '2024-2025', semester: 1 },
];

// Helper functions
export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function getClassById(id: string): Class | undefined {
  return classes.find(c => c.id === id);
}

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find(s => s.id === id);
}

export function getCoursesByClassId(classId: string): Course[] {
  return courses.filter(c => c.classId === classId);
}

export function getCoursesByDay(classId: string, dayOfWeek: number): Course[] {
  return courses.filter(c => c.classId === classId && c.dayOfWeek === dayOfWeek);
}

export function getGradesByStudent(studentId: string): Grade[] {
  return grades.filter(g => g.studentId === studentId);
}

export function getHomeworkByClass(classId: string): Homework[] {
  return homework.filter(h => h.classId === classId);
}

export function getSubmissionsByStudent(studentId: string): Submission[] {
  return submissions.filter(s => s.studentId === studentId);
}

export function getAttendanceByStudent(studentId: string): Attendance[] {
  return attendance.filter(a => a.studentId === studentId);
}

export function getConversationsByUser(userId: string): Conversation[] {
  return conversations.filter(c => c.participantIds.includes(userId));
}

export function getMessagesByConversation(conversationId: string): Message[] {
  return messages.filter(m => m.conversationId === conversationId);
}

export function getDocumentsBySubject(subjectId: string): Document[] {
  return documents.filter(d => d.subjectId === subjectId);
}

export function getPublishedMedia(): MediaContent[] {
  return mediaContent.filter(m => m.status === 'published');
}

export function getMediaByAuthor(authorId: string): MediaContent[] {
  return mediaContent.filter(m => m.authorId === authorId || m.coAuthorIds.includes(authorId));
}

export function getReactionsByContent(contentId: string): Reaction[] {
  return reactions.filter(r => r.contentId === contentId);
}

export function getCommentsByContent(contentId: string): Comment[] {
  return comments.filter(c => c.contentId === contentId);
}

export function getNotificationsByUser(userId: string): Notification[] {
  return notifications.filter(n => n.userId === userId);
}

export function getUnreadNotifications(userId: string): Notification[] {
  return notifications.filter(n => n.userId === userId && !n.read);
}

export function getInvoicesByStudent(studentId: string): Invoice[] {
  return invoices.filter(i => i.studentId === studentId);
}

export function calculateAverage(studentGrades: Grade[], subjectId?: string): number {
  const filtered = subjectId
    ? studentGrades.filter(g => g.subjectId === subjectId)
    : studentGrades;

  if (filtered.length === 0) return 0;

  const totalWeighted = filtered.reduce((sum, g) => sum + (g.value * g.coefficient), 0);
  const totalCoef = filtered.reduce((sum, g) => sum + g.coefficient, 0);

  return Math.round((totalWeighted / totalCoef) * 100) / 100;
}
