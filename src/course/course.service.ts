import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/user.entity';

@Injectable()
export class CourseService {
  private courses: Course[] = [];

  //function to find the current course
  findCurr(): Course[] {
    return this.courses.filter((course) => course.term === '22T2');
  }
  //finding the past courses
  findPast(): Course[] {
    return this.courses.filter((course) => course.term !== '22T2');
  }
  //creating a course
  createCourse(CreateCourseDto: CreateCourseDto): Course {
    if (
      CreateCourseDto.code.length === 0 ||
      CreateCourseDto.name.length === 0 ||
      CreateCourseDto.term.length === 0
    ) {
      return;
    }
    const course = { id: Date.now(), ...CreateCourseDto };
    this.courses.push(course);
    return course;
  }
}
