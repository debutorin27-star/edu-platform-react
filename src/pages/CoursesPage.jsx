import { useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import TextField from '../components/TextField.jsx';

export default function CoursesPage({ courses, lecturers, onOpenLecturer, onBook }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return courses;
    return courses.filter((course) =>
      course.title.toLowerCase().includes(value) ||
      course.description.toLowerCase().includes(value) ||
      course.lecturerName.toLowerCase().includes(value) ||
      course.topics.some((topic) => topic.toLowerCase().includes(value))
    );
  }, [courses, query]);

  const getLecturer = (id) => lecturers.find((item) => item.id === id);

  return (
    <main className="page-main">
      <section className="catalog-hero catalog-hero--courses">
        <div className="container">
          <SectionTitle
            eyebrow="Программы"
            title="Лекции и дисциплины"
            text="30 программ из задания: от алгоритмов и машинного обучения до архитектуры, психологии и международных отношений."
          />
          <TextField
            className="search-field search-field--hero"
            icon="⌕"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по программе, теме или преподавателю"
            aria-label="Поиск по программам"
          />
        </div>
      </section>

      <section className="section section--catalog">
        <div className="container">
          <div className="result-line"><strong>Программ: {filtered.length}</strong></div>
          <div className="courses-grid">
            {filtered.map((course, index) => {
              const lecturer = getLecturer(course.lecturerId);
              return (
                <article className="course-card" key={`${course.lecturerId}-${course.title}`}>
                  <div className="course-index">{String(index + 1).padStart(2, '0')}</div>
                  <div className="course-card-body">
                    <span className="course-count">10 тем</span>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <button className="course-lecturer" type="button" onClick={() => onOpenLecturer(lecturer)}>
                      <img src={course.lecturerPhoto} alt="" />
                      <span><small>Преподаватель</small><strong>{course.lecturerName}</strong></span>
                    </button>
                    <div className="course-card-actions">
                      <button className="link-button" type="button" onClick={() => onOpenLecturer(lecturer)}>Темы курса →</button>
                      <button className="button button--tiny" type="button" onClick={() => onBook(lecturer)}>Записаться</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
