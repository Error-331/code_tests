# ps

## 'ps' example


```shell

ps

```

- PID - The process ID;
- TTY - The name of the controlling terminal for the process;
- TIME - The cumulative CPU time of the process, shown in minutes and seconds;
- CMD - The name of the command that was used to start the process;


## 'ps aux' example

```sell

ps aux

```

### Options description

- 'a' option tells ps to display the processes of all users. Only the processes that not associated with a terminal and processes of 
group leaders are not shown;

- 'u' stands for a user-oriented format that provides detailed information about the processes;

- The 'x' option instructs ps to list the processes without a controlling terminal. Those are mainly processes that are started on 
boot time and running in the background;

### Output description

- USER - The user who runs the process;
- %CPU - The cpu utilization of the process;
- %MEM - The percentage of the process's resident set size to the physical memory on the machine;
- VSZ - Virtual memory size of the process in KiB;
- RSS - The size of the physical memory that the process is using;
- STAT - The the process state code, such as Z (zombie), S (sleeping), and R (running);
- START - The time when the command started;

## Sorting


```shell

ps aux --sort=-%mem

```
