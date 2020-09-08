export const TaskTypes = {
  deadline: "deadline",
  test: "test",
  newtask: "newtask",
  lecture: "lecture",
};

export const EventTypeToName: Record<string, string> = {
  lecture_online: "online lecture",
  lecture_offline: "offline lecture",
  lecture_mixed: "mixed lecture",
  lecture_self_study: "self study",
  warmup: "warm-up",
  jstask: "js task",
  kotlintask: "kotlin task",
  objctask: "objc task",
  htmltask: "html task",
  codejam: "code jam",
  externaltask: "external task",
  codewars: "codewars",
  selfeducation: "self education",
  "codewars:stage1": "codewars",
  "codewars:stage2": "codewars",

};

export interface ScheduleDataTemplate {
  Blocks?: string;
  Time?: string;
  Result?: string;
  Notate?: string;
}

export interface ScheduleDataTertiary extends ScheduleDataTemplate {
  Task: string;
}

export interface ScheduleDataSecondary extends ScheduleDataTemplate {
  Task?: string;
  Include?: ScheduleDataTertiary[];
}

export interface ScheduleData extends ScheduleDataTemplate {
  Task: string;
  Include?: ScheduleDataSecondary[];
}
