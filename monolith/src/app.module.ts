import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AuthModule, UsersModule, ProjectsModule, TasksModule, CommonModule],
})
export class AppModule {}
