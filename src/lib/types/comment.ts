import { ReactionType } from "./enums";
import { User } from "./user";

/**
 * Comment interface
 */
export interface Comment {
    id: number;
    taskInstanceId: number;
    userId: number;
    content: string;
    parentId?: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * CommentMention interface
 */
export interface CommentMention {
    id: number;
    commentId: number;
    userId: number;
    mentionedById: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * Reaction interface
 */
export interface Reaction {
    id: number;
    commentId: number;
    userId: number;
    type: ReactionType;
    createdAt: string | Date;
    updatedAt: string | Date;
}

/**
 * Enhanced reaction with user data
 */
export interface ReactionWithUser extends Reaction {
    user: User;
}

/**
 * Enhanced comment mention with user data
 */
export interface CommentMentionWithUsers extends CommentMention {
    mentionedUser: User;
    mentionedBy: User;
}

/**
 * Enhanced comment with relations
 */
export interface CommentWithRelations extends Comment {
    user: User;
    replies?: CommentWithRelations[];
    reactions?: ReactionWithUser[];
    mentions?: CommentMentionWithUsers[];
}

/**
 * Task comments container
 */
export interface TaskComments {
    comments: CommentWithRelations[];
    totalCount: number;
}

/**
 * Comment creation data
 */
export interface CreateCommentData {
    taskInstanceId: number;
    content: string;
    parentId?: number;
    mentionedUserIds?: number[];
}

/**
 * Reaction creation data
 */
export interface CreateReactionData {
    commentId: number;
    type: ReactionType;
} 