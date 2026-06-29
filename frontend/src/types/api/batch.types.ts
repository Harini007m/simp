export interface BatchCreate {
  program_id: string;
  batch_code: string;
  batch_name: string;
  max_capacity: number;
  start_date: string;
  end_date: string;
  batch_status: string;
}

export interface BatchResponse {
  batch_id: string;
  program_id: string;
  batch_code: string;
  batch_name: string;
  max_capacity: number;
  start_date: string;
  end_date: string;
  batch_status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface BatchStudentCreate {
  batch_id: string;
  student_id: string;
  assigned_by: string;
}
export interface BatchStudent { id: string; [key: string]: any; }
export interface BatchTimelineEvent { id: string; [key: string]: any; }
export interface BatchProject { id: string; [key: string]: any; }

export interface BatchStudentResponse {
  batch_student_id: string;
  batch_id: string;
  student_id: string;
  assigned_at: string;
  assigned_by: string;
}
export interface Batch { id: string; name: string; [key: string]: any; }
