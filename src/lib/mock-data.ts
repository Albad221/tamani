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
    dateOfBirth: '2006-03-15',
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
    dateOfBirth: '2006-07-22',
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
    dateOfBirth: '2006-01-10',
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
    dateOfBirth: '2005-11-05',
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
    subjects: ['subject-5'],
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

// Classes
export const classes: Class[] = [
  {
    id: 'class-1',
    name: 'Terminale S1',
    level: 'Terminale',
    year: '2024-2025',
    studentIds: ['student-1', 'student-2', 'student-3'],
    mainTeacherId: 'teacher-1',
  },
  {
    id: 'class-2',
    name: 'Terminale S2',
    level: 'Terminale',
    year: '2024-2025',
    studentIds: ['student-4'],
    mainTeacherId: 'teacher-2',
  },
  {
    id: 'class-3',
    name: 'Première S1',
    level: 'Première',
    year: '2024-2025',
    studentIds: [],
    mainTeacherId: 'teacher-3',
  },
];

// Subjects
export const subjects: Subject[] = [
  { id: 'subject-1', name: 'Mathématiques', code: 'MATH', coefficient: 5, color: '#4F6AF0' },
  { id: 'subject-2', name: 'Physique-Chimie', code: 'PC', coefficient: 4, color: '#10B981' },
  { id: 'subject-3', name: 'Français', code: 'FR', coefficient: 3, color: '#F59E0B' },
  { id: 'subject-4', name: 'Histoire-Géographie', code: 'HG', coefficient: 3, color: '#8B5CF6' },
  { id: 'subject-5', name: 'Anglais', code: 'ANG', coefficient: 2, color: '#EC4899' },
  { id: 'subject-6', name: 'Philosophie', code: 'PHILO', coefficient: 3, color: '#06B6D4' },
  { id: 'subject-7', name: 'SVT', code: 'SVT', coefficient: 4, color: '#84CC16' },
];

// Courses (Weekly Schedule)
export const courses: Course[] = [
  // Monday
  { id: 'course-1', title: 'Mathématiques', subjectId: 'subject-1', teacherId: 'teacher-1', classId: 'class-1', room: 'Salle 204', startTime: '08:00', endTime: '10:00', dayOfWeek: 1, color: '#4F6AF0' },
  { id: 'course-2', title: 'Français', subjectId: 'subject-3', teacherId: 'teacher-2', classId: 'class-1', room: 'Salle B12', startTime: '10:15', endTime: '12:15', dayOfWeek: 1, color: '#F59E0B' },
  { id: 'course-3', title: 'Anglais', subjectId: 'subject-5', teacherId: 'teacher-3', classId: 'class-1', room: 'Salle 105', startTime: '14:00', endTime: '16:00', dayOfWeek: 1, color: '#EC4899' },
  // Tuesday
  { id: 'course-4', title: 'Physique-Chimie', subjectId: 'subject-2', teacherId: 'teacher-1', classId: 'class-1', room: 'Labo PC', startTime: '08:00', endTime: '10:00', dayOfWeek: 2, color: '#10B981' },
  { id: 'course-5', title: 'Histoire-Géographie', subjectId: 'subject-4', teacherId: 'teacher-2', classId: 'class-1', room: 'Salle 301', startTime: '10:15', endTime: '12:15', dayOfWeek: 2, color: '#8B5CF6' },
  { id: 'course-6', title: 'SVT', subjectId: 'subject-7', teacherId: 'teacher-1', classId: 'class-1', room: 'Labo SVT', startTime: '14:00', endTime: '16:00', dayOfWeek: 2, color: '#84CC16' },
  // Wednesday
  { id: 'course-7', title: 'Mathématiques', subjectId: 'subject-1', teacherId: 'teacher-1', classId: 'class-1', room: 'Salle 204', startTime: '08:00', endTime: '10:00', dayOfWeek: 3, color: '#4F6AF0' },
  { id: 'course-8', title: 'Philosophie', subjectId: 'subject-6', teacherId: 'teacher-2', classId: 'class-1', room: 'Salle 202', startTime: '10:15', endTime: '12:15', dayOfWeek: 3, color: '#06B6D4' },
  // Thursday
  { id: 'course-9', title: 'Physique-Chimie', subjectId: 'subject-2', teacherId: 'teacher-1', classId: 'class-1', room: 'Labo PC', startTime: '08:00', endTime: '10:00', dayOfWeek: 4, color: '#10B981' },
  { id: 'course-10', title: 'Français', subjectId: 'subject-3', teacherId: 'teacher-2', classId: 'class-1', room: 'Salle B12', startTime: '10:15', endTime: '12:15', dayOfWeek: 4, color: '#F59E0B' },
  { id: 'course-11', title: 'Anglais', subjectId: 'subject-5', teacherId: 'teacher-3', classId: 'class-1', room: 'Salle 105', startTime: '14:00', endTime: '16:00', dayOfWeek: 4, color: '#EC4899' },
  // Friday
  { id: 'course-12', title: 'Mathématiques', subjectId: 'subject-1', teacherId: 'teacher-1', classId: 'class-1', room: 'Salle 204', startTime: '08:00', endTime: '10:00', dayOfWeek: 5, color: '#4F6AF0' },
  { id: 'course-13', title: 'SVT', subjectId: 'subject-7', teacherId: 'teacher-1', classId: 'class-1', room: 'Labo SVT', startTime: '10:15', endTime: '12:15', dayOfWeek: 5, color: '#84CC16' },
  { id: 'course-14', title: 'Histoire-Géographie', subjectId: 'subject-4', teacherId: 'teacher-2', classId: 'class-1', room: 'Salle 301', startTime: '14:00', endTime: '15:00', dayOfWeek: 5, color: '#8B5CF6' },
];

// Grades
export const grades: Grade[] = [
  { id: 'grade-1', studentId: 'student-1', subjectId: 'subject-1', teacherId: 'teacher-1', value: 16, coefficient: 2, type: 'exam', title: 'Contrôle n°1 - Suites', date: '2024-10-15', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-2', studentId: 'student-1', subjectId: 'subject-1', teacherId: 'teacher-1', value: 14, coefficient: 1, type: 'quiz', title: 'Interrogation - Limites', date: '2024-10-28', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-3', studentId: 'student-1', subjectId: 'subject-1', teacherId: 'teacher-1', value: 17, coefficient: 2, type: 'exam', title: 'Contrôle n°2 - Dérivation', date: '2024-11-12', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-4', studentId: 'student-1', subjectId: 'subject-2', teacherId: 'teacher-1', value: 15, coefficient: 2, type: 'exam', title: 'DS1 - Mécanique', date: '2024-10-18', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-5', studentId: 'student-1', subjectId: 'subject-2', teacherId: 'teacher-1', value: 18, coefficient: 1, type: 'homework', title: 'TP - Chute libre', date: '2024-10-25', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-6', studentId: 'student-1', subjectId: 'subject-3', teacherId: 'teacher-2', value: 13, coefficient: 2, type: 'exam', title: 'Dissertation', date: '2024-10-20', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-7', studentId: 'student-1', subjectId: 'subject-3', teacherId: 'teacher-2', value: 15, coefficient: 1, type: 'oral', title: 'Exposé oral', date: '2024-11-05', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-8', studentId: 'student-1', subjectId: 'subject-4', teacherId: 'teacher-2', value: 14, coefficient: 2, type: 'exam', title: 'Contrôle - Guerre Froide', date: '2024-10-22', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-9', studentId: 'student-1', subjectId: 'subject-5', teacherId: 'teacher-3', value: 16, coefficient: 1, type: 'oral', title: 'Speaking test', date: '2024-10-30', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-10', studentId: 'student-1', subjectId: 'subject-5', teacherId: 'teacher-3', value: 15, coefficient: 2, type: 'exam', title: 'Written test', date: '2024-11-15', semester: 1, academicYear: '2024-2025' },
  // Grades for student-2
  { id: 'grade-11', studentId: 'student-2', subjectId: 'subject-1', teacherId: 'teacher-1', value: 12, coefficient: 2, type: 'exam', title: 'Contrôle n°1 - Suites', date: '2024-10-15', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-12', studentId: 'student-2', subjectId: 'subject-1', teacherId: 'teacher-1', value: 11, coefficient: 1, type: 'quiz', title: 'Interrogation - Limites', date: '2024-10-28', semester: 1, academicYear: '2024-2025' },
  { id: 'grade-13', studentId: 'student-2', subjectId: 'subject-2', teacherId: 'teacher-1', value: 14, coefficient: 2, type: 'exam', title: 'DS1 - Mécanique', date: '2024-10-18', semester: 1, academicYear: '2024-2025' },
];

// Homework
export const homework: Homework[] = [
  {
    id: 'hw-1',
    title: 'Exercices sur les suites numériques',
    description: 'Faire les exercices 12, 15 et 18 page 234 du manuel. Rédiger proprement les démonstrations.',
    subjectId: 'subject-1',
    teacherId: 'teacher-1',
    classId: 'class-1',
    dueDate: '2024-12-02',
    publishedAt: '2024-11-25',
    attachments: [],
    maxScore: 20,
    type: 'individual',
  },
  {
    id: 'hw-2',
    title: 'Compte-rendu TP Chimie',
    description: 'Rédiger le compte-rendu du TP sur les dosages acido-basiques. Inclure les calculs et graphiques.',
    subjectId: 'subject-2',
    teacherId: 'teacher-1',
    classId: 'class-1',
    dueDate: '2024-12-05',
    publishedAt: '2024-11-26',
    attachments: ['consignes-tp.pdf'],
    maxScore: 20,
    type: 'individual',
  },
  {
    id: 'hw-3',
    title: 'Dissertation: Le bonheur est-il le but de la vie?',
    description: 'Dissertation philosophique. 3 pages minimum. Introduction, développement en 3 parties, conclusion.',
    subjectId: 'subject-6',
    teacherId: 'teacher-2',
    classId: 'class-1',
    dueDate: '2024-12-10',
    publishedAt: '2024-11-20',
    attachments: [],
    maxScore: 20,
    type: 'individual',
  },
  {
    id: 'hw-4',
    title: 'Projet groupe: Présentation pays anglophone',
    description: 'Préparer une présentation de 15 minutes sur un pays anglophone au choix. Groupes de 3.',
    subjectId: 'subject-5',
    teacherId: 'teacher-3',
    classId: 'class-1',
    dueDate: '2024-12-15',
    publishedAt: '2024-11-18',
    attachments: [],
    maxScore: 20,
    type: 'group',
  },
];

// Submissions
export const submissions: Submission[] = [
  { id: 'sub-1', homeworkId: 'hw-1', studentId: 'student-1', status: 'pending', files: [], },
  { id: 'sub-2', homeworkId: 'hw-2', studentId: 'student-1', status: 'pending', files: [], },
  { id: 'sub-3', homeworkId: 'hw-3', studentId: 'student-1', submittedAt: '2024-11-28', status: 'submitted', files: ['dissertation-amina.pdf'], textContent: 'Voir fichier joint.' },
  { id: 'sub-4', homeworkId: 'hw-4', studentId: 'student-1', status: 'pending', files: [], },
  { id: 'sub-5', homeworkId: 'hw-1', studentId: 'student-2', submittedAt: '2024-11-30', status: 'submitted', files: ['exercices-kouame.pdf'], },
  { id: 'sub-6', homeworkId: 'hw-2', studentId: 'student-2', status: 'pending', files: [], },
];

// Attendance
export const attendance: Attendance[] = [
  { id: 'att-1', studentId: 'student-1', courseId: 'course-1', date: '2024-11-25', status: 'present' },
  { id: 'att-2', studentId: 'student-1', courseId: 'course-2', date: '2024-11-25', status: 'present' },
  { id: 'att-3', studentId: 'student-1', courseId: 'course-3', date: '2024-11-25', status: 'late', minutesLate: 10 },
  { id: 'att-4', studentId: 'student-1', courseId: 'course-4', date: '2024-11-26', status: 'present' },
  { id: 'att-5', studentId: 'student-1', courseId: 'course-5', date: '2024-11-26', status: 'absent', justification: 'Rendez-vous médical' },
  { id: 'att-6', studentId: 'student-1', courseId: 'course-6', date: '2024-11-26', status: 'excused', justification: 'Rendez-vous médical', validatedBy: 'admin-1', validatedAt: '2024-11-26' },
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
    title: 'Groupe projet anglais',
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
    content: 'Bonjour Professeur, j\'ai une question concernant l\'exercice 15 sur les suites.',
    attachments: [],
    sentAt: '2024-11-28T10:30:00',
    readBy: ['student-1', 'teacher-1'],
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'teacher-1',
    content: 'Bonjour Amina, oui bien sûr. Qu\'est-ce qui vous pose problème exactement?',
    attachments: [],
    sentAt: '2024-11-28T11:15:00',
    readBy: ['teacher-1', 'student-1'],
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'student-1',
    content: 'Je n\'arrive pas à démontrer que la suite est convergente. J\'ai essayé avec le théorème de convergence monotone mais je bloque.',
    attachments: [],
    sentAt: '2024-11-28T11:30:00',
    readBy: ['student-1', 'teacher-1'],
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    senderId: 'teacher-1',
    content: 'Avez-vous d\'abord prouvé que la suite est bornée? C\'est une étape importante. Montrez d\'abord que pour tout n, 0 < u_n < 2.',
    attachments: [],
    sentAt: '2024-11-28T14:00:00',
    readBy: ['teacher-1'],
  },
  {
    id: 'msg-5',
    conversationId: 'conv-3',
    senderId: 'student-2',
    content: 'Salut! On se retrouve à la bibliothèque demain pour avancer sur le projet?',
    attachments: [],
    sentAt: '2024-11-29T09:00:00',
    readBy: ['student-2', 'student-3'],
  },
  {
    id: 'msg-6',
    conversationId: 'conv-3',
    senderId: 'student-3',
    content: 'Oui, je peux vers 14h!',
    attachments: [],
    sentAt: '2024-11-29T09:15:00',
    readBy: ['student-3'],
  },
];

// Documents
export const documents: Document[] = [
  {
    id: 'doc-1',
    title: 'Cours - Suites numériques',
    description: 'Chapitre complet sur les suites numériques avec exemples et exercices corrigés.',
    fileUrl: '/documents/cours-suites.pdf',
    fileType: 'pdf',
    type: 'course',
    subjectId: 'subject-1',
    uploadedById: 'teacher-1',
    visibility: 'class',
    classIds: ['class-1', 'class-2'],
    createdAt: '2024-09-15',
    downloadCount: 45,
  },
  {
    id: 'doc-2',
    title: 'Fiche de révision - Mécanique',
    description: 'Résumé des formules et concepts clés en mécanique.',
    fileUrl: '/documents/fiche-mecanique.pdf',
    fileType: 'pdf',
    type: 'resource',
    subjectId: 'subject-2',
    uploadedById: 'teacher-1',
    visibility: 'public',
    classIds: [],
    createdAt: '2024-10-01',
    downloadCount: 78,
  },
  {
    id: 'doc-3',
    title: 'Annales BAC 2024 - Mathématiques',
    description: 'Sujets et corrigés du BAC 2024 série S.',
    fileUrl: '/documents/annales-bac-math-2024.pdf',
    fileType: 'pdf',
    type: 'exercise',
    subjectId: 'subject-1',
    uploadedById: 'teacher-1',
    visibility: 'public',
    classIds: [],
    createdAt: '2024-09-10',
    downloadCount: 156,
  },
  {
    id: 'doc-4',
    title: 'Règlement intérieur 2024-2025',
    description: 'Règlement intérieur de l\'établissement.',
    fileUrl: '/documents/reglement.pdf',
    fileType: 'pdf',
    type: 'official',
    uploadedById: 'admin-1',
    visibility: 'public',
    classIds: [],
    createdAt: '2024-09-01',
    downloadCount: 230,
  },
];

// Categories for Media
export const categories: Category[] = [
  { id: 'cat-1', name: 'Vie scolaire', slug: 'vie-scolaire', description: 'Actualités et événements de l\'école', icon: 'school', color: '#4F6AF0' },
  { id: 'cat-2', name: 'Sciences', slug: 'sciences', description: 'Contenus scientifiques', icon: 'flask', color: '#10B981' },
  { id: 'cat-3', name: 'Culture', slug: 'culture', description: 'Art, littérature et philosophie', icon: 'book', color: '#F59E0B' },
  { id: 'cat-4', name: 'Orientation', slug: 'orientation', description: 'Conseils et témoignages pour l\'orientation', icon: 'compass', color: '#8B5CF6' },
  { id: 'cat-5', name: 'Sport', slug: 'sport', description: 'Actualités sportives', icon: 'trophy', color: '#EC4899' },
];

// Media Content
export const mediaContent: MediaContent[] = [
  {
    id: 'media-1',
    title: 'La semaine des Arts - Reportage',
    description: 'Découvrez les moments forts de la semaine des arts à Tamani. Expositions, performances et témoignages d\'élèves.',
    type: 'video',
    mediaUrl: 'https://example.com/video1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop',
    authorId: 'student-1',
    coAuthorIds: ['student-2'],
    categoryId: 'cat-1',
    tags: ['arts', 'événement', 'culture'],
    status: 'published',
    validatedById: 'teacher-2',
    publishedAt: '2024-11-25',
    viewCount: 234,
    featured: true,
  },
  {
    id: 'media-2',
    title: 'Podcast: Mon parcours vers les classes prépa',
    description: 'Interview avec Awa, ancienne élève de Tamani, maintenant en prépa scientifique à Paris.',
    type: 'podcast',
    mediaUrl: 'https://example.com/podcast1.mp3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop',
    authorId: 'student-3',
    coAuthorIds: [],
    categoryId: 'cat-4',
    subjectId: 'subject-1',
    tags: ['orientation', 'prépa', 'témoignage'],
    status: 'published',
    validatedById: 'teacher-1',
    publishedAt: '2024-11-20',
    viewCount: 189,
    featured: false,
  },
  {
    id: 'media-3',
    title: 'Fiche de synthèse: Les suites géométriques',
    description: 'Résumé visuel complet sur les suites géométriques. Formules, propriétés et applications.',
    type: 'infographic',
    mediaUrl: '/media/suites-geo.png',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
    authorId: 'student-1',
    coAuthorIds: [],
    categoryId: 'cat-2',
    subjectId: 'subject-1',
    tags: ['mathématiques', 'suites', 'révision'],
    status: 'published',
    validatedById: 'teacher-1',
    publishedAt: '2024-11-18',
    viewCount: 312,
    featured: true,
  },
  {
    id: 'media-4',
    title: 'Article: L\'intelligence artificielle dans l\'éducation',
    description: 'Comment l\'IA transforme l\'apprentissage et quels sont les enjeux pour notre génération.',
    type: 'article',
    mediaUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    authorId: 'student-2',
    coAuthorIds: ['student-4'],
    categoryId: 'cat-2',
    tags: ['IA', 'technologie', 'éducation'],
    status: 'published',
    validatedById: 'teacher-1',
    publishedAt: '2024-11-15',
    viewCount: 156,
    featured: false,
  },
  {
    id: 'media-5',
    title: 'Exposé vidéo: La colonisation en Afrique',
    description: 'Présentation filmée sur l\'histoire de la colonisation et ses conséquences contemporaines.',
    type: 'video',
    mediaUrl: 'https://example.com/video2.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop',
    authorId: 'student-4',
    coAuthorIds: [],
    categoryId: 'cat-3',
    subjectId: 'subject-4',
    tags: ['histoire', 'Afrique', 'exposé'],
    status: 'published',
    validatedById: 'teacher-2',
    publishedAt: '2024-11-10',
    viewCount: 98,
    featured: false,
  },
  {
    id: 'media-6',
    title: 'Résumé de cours: Dissertation philosophique',
    description: 'Méthodologie complète pour réussir sa dissertation au BAC.',
    type: 'summary',
    mediaUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop',
    authorId: 'student-3',
    coAuthorIds: [],
    categoryId: 'cat-3',
    subjectId: 'subject-6',
    tags: ['philosophie', 'méthodologie', 'BAC'],
    status: 'pending',
    publishedAt: undefined,
    viewCount: 0,
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
  { id: 'com-1', contentId: 'media-1', userId: 'student-3', text: 'Super reportage! J\'ai adoré la partie sur l\'exposition de peinture.', createdAt: '2024-11-25T15:30:00' },
  { id: 'com-2', contentId: 'media-1', userId: 'teacher-2', text: 'Excellent travail les équipes! La qualité vidéo est vraiment professionnelle.', createdAt: '2024-11-25T16:00:00' },
  { id: 'com-3', contentId: 'media-3', userId: 'student-2', text: 'Merci Amina, cette fiche m\'a vraiment aidé pour le contrôle!', createdAt: '2024-11-19T10:00:00' },
  { id: 'com-4', contentId: 'media-3', userId: 'teacher-1', text: 'Très bonne synthèse, claire et bien structurée.', createdAt: '2024-11-19T14:30:00' },
  { id: 'com-5', contentId: 'media-2', userId: 'student-1', text: 'Inspirant! Ça me motive pour les concours.', createdAt: '2024-11-21T09:00:00' },
];

// Notifications
export const notifications: Notification[] = [
  { id: 'notif-1', userId: 'student-1', type: 'grade', title: 'Nouvelle note', body: 'Vous avez reçu 17/20 en Mathématiques', link: '/dashboard/grades', read: false, createdAt: '2024-11-29T08:00:00' },
  { id: 'notif-2', userId: 'student-1', type: 'homework', title: 'Devoir à rendre', body: 'Exercices sur les suites - Dans 3 jours', link: '/dashboard/homework/hw-1', read: false, createdAt: '2024-11-29T07:00:00' },
  { id: 'notif-3', userId: 'student-1', type: 'message', title: 'Nouveau message', body: 'Prof. Mensah vous a répondu', link: '/dashboard/messages/conv-1', read: true, createdAt: '2024-11-28T14:00:00' },
  { id: 'notif-4', userId: 'student-1', type: 'media', title: 'Contenu mis en avant', body: 'Votre fiche sur les suites est featured!', link: '/dashboard/media/media-3', read: true, createdAt: '2024-11-18T12:00:00' },
  { id: 'notif-5', userId: 'student-1', type: 'attendance', title: 'Retard enregistré', body: 'Retard de 10 min en Anglais', link: '/dashboard/attendance', read: true, createdAt: '2024-11-25T16:00:00' },
];

// Invoices
export const invoices: Invoice[] = [
  { id: 'inv-1', studentId: 'student-1', amount: 250000, description: 'Frais de scolarité - 1er trimestre', dueDate: '2024-10-15', status: 'paid', paidAt: '2024-10-10', paymentMethod: 'Virement', academicYear: '2024-2025', semester: 1 },
  { id: 'inv-2', studentId: 'student-1', amount: 250000, description: 'Frais de scolarité - 2ème trimestre', dueDate: '2025-01-15', status: 'pending', academicYear: '2024-2025', semester: 1 },
  { id: 'inv-3', studentId: 'student-1', amount: 25000, description: 'Frais d\'inscription activités sportives', dueDate: '2024-11-30', status: 'overdue', academicYear: '2024-2025', semester: 1 },
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
