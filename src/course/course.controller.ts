import {
  Body,
  Controller,
  Get,
  NotAcceptableException,
  Post,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/user.entity';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}
  //getting all curr  course
  @Get('getCurr')
  getCurr(): Course[] {
    return this.courseService.findCurr();
  }
  //getting all past course
  @Get('getPast')
  getPast(): Course[] {
    return this.courseService.findPast();
  }
  //creating new course
  @Post()
  createCourse(@Body() body: CreateCourseDto): Course {
    const course = this.courseService.createCourse(body);
    if (!course) {
      throw new NotAcceptableException();
    }
    return course;
  }
}
