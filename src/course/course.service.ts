import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { assessments, Course, WAM } from './entities/user.entity';

@Injectable()
export class CourseService {
  private courses: Course[] = [];

  //function to find the current course
  findCurr(): Course[] {
    return this.courses.filter((course) => course.term === '22T3');
  }
  //finding the past courses
  findPast(): Course[] {
    return this.courses.filter((course) => course.term !== '22T3');
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
    const course = { id: Date.now(), 
                  name: CreateCourseDto.name, 
                  code: CreateCourseDto.code, 
                  term: CreateCourseDto.term,
                  goalMark: 0,
                  assMarks: [],
                  totalMark: 0,
                  };
    this.courses.push(course);
    return course;
  }

  addAssesment(newAss: assessments): boolean {
    // Check to make sure New Assessment is valid
    if (
      newAss.code.length === 0 ||
      newAss.name.length === 0 ||
      newAss.weighting === 0 
    ) {
      return false;
    }

    const assessment = {code: newAss.code,
                    name: newAss.name,
                    weighting: newAss.weighting,
                    marks: newAss.marks,
    };  

    const course = this.courses.find((course) => course.code === newAss.code);
    course.assMarks.push(assessment);

    return true;

  }

  getAssignments(code: string): assessments[] {

    // Check if code is correct length
    if (code.length === 0) {
      return;
    }
    const course = this.courses.find((course) => course.code === code);

    return course.assMarks;
  }

  termWAM(): WAM[] {
    
    const terms = [ '16T1', 
                    '16T2', 
                    '17T1', 
                    '17T2', 
                    '18T1', 
                    '18T2',
                    '19T1',
                    '19T2',
                    '19T3',
                    '20T1',
                    '20T2',
                    '20T3',
                    '21T1',
                    '21T2',
                    '21T3',
                    '22T1',
                    '22T2',
                    '22T3',
                    '23T1',
                    '23T2',
                    '23T3',
                    'done']

    const result: WAM[] = [];

    const prevMarks = [];

    let i = 0;
    while (terms[i] != 'done') {
      let course = this.courses.filter((course) => course.term === terms[i]);

      let length = course.length;
      let j = 0;
        while (j < length) {
          prevMarks.push(course[j].totalMark);
          j++;
        }
      if ( terms[i] == '21T3' ||
           terms[i] == '22T1' ||
           terms[i] == '22T2' ||
           terms[i] == '22T3' ||
           terms[i] == '23T1' ||
           terms[i] == '23T2'
      ) {
        let calcWAM = prevMarks.reduce((a, b) => a + b, 0) / prevMarks.length;
        let newWAM = { term: terms[i],
                         WAM: calcWAM,
        }; 
        result.push(newWAM);
    }
    i++;
  }
  return result;
}
