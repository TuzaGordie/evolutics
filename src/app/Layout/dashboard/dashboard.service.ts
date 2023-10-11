import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { UsersService } from 'src/app/Services/life/users.service';
import { environment } from 'src/environments/environment';
import { IDashboardData, ITasksSummary, WorkflowTask } from './dashboard.interface';

const baseURL = environment.apiBaseUrl;
const API = {
  search: baseURL + '/rest/workflows/',
  tasksSummary: baseURL + "/rest/workflows/summary/task/user/",
  tasksBase: baseURL + "/rest/workflows/active/task",
  snoozed: baseURL + "/rest/workflows/pending/snooze/",
  timeOsSla: baseURL + "/rest/workflows/compute/time/os/wf/sla/",
};

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  userID: string;
  userGroup: string;

  constructor(public apiService: ApiService, private userService: UsersService) {
    // this.userService.getuserId().subscribe(data => {
    //     this.userID = data
    // })
    // this.userService.getusersGroup().subscribe(data => {
    //     this.userGroup = data
    //     console.log(this.userGroup)
    // })
  }

  getTasksSummary(userId: string): Observable<ITasksSummary> {
    return this.apiService.get(API.tasksSummary + userId).pipe(catchError(err=> of([])))
  }

  getDashboardData(userId: string): Observable<any[]> {
    // return this.apiService.get(API.search).pipe(
    //   map((data) => this.sortTaskData(data)),
    //   shareReplay()
    // );
    
    // define observables to fetch different types of tasks. Return an empty array if any errors
    const yellowTasks$ = this.apiService.get(`${API.tasksBase}/${userId}/Y`).pipe(catchError(err => of([])));
    const redTasks$ = this.apiService.get(`${API.tasksBase}/${userId}/R`).pipe(catchError(err => of([])));
    const blackTasks$ = this.apiService.get(`${API.tasksBase}/${userId}/B`).pipe(catchError(err => of([])));
    const greenTasks$ = this.apiService.get(`${API.tasksBase}/${userId}/G`).pipe(catchError(err => of([])));

    return forkJoin([yellowTasks$, redTasks$, blackTasks$, greenTasks$]).pipe(
      map(([yellows, reds, blacks, greens]) => ([...yellows, ...reds, ...blacks, ...greens])),
    )
  }

  getSnoozedTasks(userId: string){
    return this.apiService
      .get(API.snoozed + userId)
      .pipe(catchError((err) => of([])));
  }

  getTimeOsSla(wfNo: string){
    return this.apiService.get(API.timeOsSla + wfNo)
  }

  // sortTaskData(data: any): IDashboardData {
  //   const tasks = data.page.content as any[];
  //   let dashboardData: IDashboardData;
  //   let newTaskCount: number = 0;
  //   let taskEscalatedCount: number = 0;
  //   let closeToSLACount: number = 0;
  //   let taskSnoozedCount: number = 0;
  //   let outsideSLACount: number = 0;

  //   let A_StatusWorkflows: WorkflowTask[] = [];

  //   tasks.forEach((task) => {
  //     if (this.userTaskCheck(task)) {
  //       if (task.escalation == true) {
  //         taskEscalatedCount++;
  //       }
  //       if (false) {
  //         newTaskCount++;
  //       }
  //       if (false) {
  //         closeToSLACount++;
  //       }
  //       if (false) {
  //         taskSnoozedCount++;
  //       }
  //       if (false) {
  //         outsideSLACount++;
  //       }
  //     }

  //     if (
  //       task.status == 'A' &&
  //       (this.userTaskCheck(task) || this.userGroupCheck(task))
  //     ) {
  //       A_StatusWorkflows.push({
  //         colorCode: task.colorCode,
  //         business: task.busLine,
  //         title: task.title,
  //         refCategory: task.refCat,
  //         refNo: task.refNo,
  //         start: task.startOn,
  //         due: task.dueOn,
  //         timeOutsideSLA: task.timeOsSla,
  //       });
  //     }
  //   });

  //   return (dashboardData = {
  //     A_WorkflowTasks: A_StatusWorkflows,
  //     workflowSummary: {
  //       totalCloseToSLA: closeToSLACount,
  //       totalEscalated: taskEscalatedCount,
  //       totalNew: newTaskCount,
  //       totalOutsideSLA: outsideSLACount,
  //       totalSnoozed: taskSnoozedCount,
  //     },
  //   });
  // }

  // userTaskCheck(task): boolean {
  //   return true;
  //   if (task.assignedTo && task.assignedTo == this.userID) {
  //     return true;
  //   }
  //   return false;
  // }
  // userGroupCheck(task) {
  //   return true;

  //   // if(task.assignedTo != null){
  //   //     return false
  //   // }
  //   // if(task.assignedToGroup == this.userGroup){
  //   //     return true
  //   // }

  //   return false;
  // }
}
