export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  classId?: string;
  subjects?: string[];
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}

export interface Class {
  id: string;
  name: string;
  level: string;
  year: string;
  studentIds: string[];
  mainTeacherId: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  coefficient: number;
  color: string;
}

export interface Course {
  id: string;
  title: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  room: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  color: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  teacherId: string;
  value: number;
  coefficient: number;
  type: 'exam' | 'quiz' | 'homework' | 'oral' | 'project';
  title: string;
  date: string;
  comment?: string;
  semester: number;
  academicYear: string;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  dueDate: string;
  publishedAt: string;
  attachments: string[];
  maxScore: number;
  type: 'individual' | 'group';
}

export interface Submission {
  id: string;
  homeworkId: string;
  studentId: string;
  submittedAt?: string;
  files: string[];
  textContent?: string;
  score?: number;
  feedback?: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  minutesLate?: number;
  justification?: string;
  validatedBy?: string;
  validatedAt?: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  type: 'private' | 'group';
  title?: string;
  createdAt: string;
  lastMessageAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  attachments: string[];
  sentAt: string;
  readBy: string[];
}

export interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  type: 'course' | 'exercise' | 'resource' | 'official';
  subjectId?: string;
  uploadedById: string;
  visibility: 'public' | 'class' | 'private';
  classIds: string[];
  createdAt: string;
  downloadCount: number;
}

export interface MediaContent {
  id: string;
  title: string;
  description: string;
  type: 'podcast' | 'video' | 'article' | 'infographic' | 'summary';
  mediaUrl: string;
  thumbnailUrl: string;
  authorId: string;
  coAuthorIds: string[];
  categoryId: string;
  subjectId?: string;
  tags: string[];
  status: 'draft' | 'pending' | 'published' | 'rejected';
  validatedById?: string;
  publishedAt?: string;
  viewCount: number;
  featured: boolean;
}

export interface Reaction {
  id: string;
  contentId: string;
  userId: string;
  type: 'like' | 'useful' | 'inspiring';
}

export interface Comment {
  id: string;
  contentId: string;
  userId: string;
  text: string;
  createdAt: string;
  parentCommentId?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface Invoice {
  id: string;
  studentId: string;
  amount: number;
  description: string;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paidAt?: string;
  paymentMethod?: string;
  receiptUrl?: string;
  academicYear: string;
  semester: number;
}
