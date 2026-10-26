import { useMemo, useRef, useState } from 'react';
import LecturerCard from '../components/LecturerCard.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import TextField from '../components/TextField.jsx';

export default function LecturersPage({ lecturers, onOpenLecturer, onBook }) {
  const [query, setQuery] = useState('');
  const [course, setCourse] = useState('Все дисциплины');
  const [gender, setGender] = useState('all');
  const searchRef = useRef(null);

  const courses = useMemo(
    () => ['Все дисциплины', ...Array.from(new Set(lecturers.flatMap((item) => item.courses.map((c) => c.title)))).sort()],
    [lecturers]
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return lecturers.filter((lecturer) => {
      const matchesQuery = !normalized ||
        lecturer.name.toLowerCase().includes(normalized) ||
        lecturer.courses.some((item) => item.title.toLowerCase().includes(normalized));
      const matchesCourse = course === 'Все дисциплины' || lecturer.courses.some((item) => item.title === course);
      const matchesGender = gender === 'all' || lecturer.gender === gender;
      return matchesQuery && matchesCourse && matchesGender;
    });
  }, [lecturers, query, course, gender]);

  const hasFilters = Boolean(query || course !== 'Все дисциплины' || gender !== 'all');

  const focusSearch = () => searchRef.current?.focus();

  const resetFilters = () => {
    setQuery('');
    setCourse('Все дисциплины');
    setGender('all');
    focusSearch();
  };

  return (
    <main className="page-main">
      <section className="catalog-hero">
        <div className="container">
          <SectionTitle
            eyebrow="Каталог"
            title="Лекторы и преподаватели"
            text="Выберите специалиста по направлению, изучите программу и тарифы, затем оставьте заявку на занятие."
          />
        </div>
      </section>

      <section className="section section--catalog">
        <div className="container">
          <div className="filters">
            <TextField
              ref={searchRef}
              className="search-field"
              icon="⌕"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Имя или дисциплина"
              aria-label="Поиск лекторов"
            />
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              {courses.map((item) => <option key={item}>{item}</option>)}
            </select>
            <div className="segmented">
              <button className={gender === 'all' ? 'active' : ''} type="button" onClick={() => setGender('all')}>Все</button>
              <button className={gender === 'male' ? 'active' : ''} type="button" onClick={() => setGender('male')}>Мужчины</button>
              <button className={gender === 'female' ? 'active' : ''} type="button" onClick={() => setGender('female')}>Женщины</button>
            </div>
          </div>

          <div className="result-line">
            <strong>Найдено: {filtered.length}</strong>
            <div className="result-actions">
              <button type="button" onClick={focusSearch}>Фокус на поле</button>
              {hasFilters && (
                <button type="button" onClick={resetFilters}>Сбросить фильтры</button>
              )}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="lecturers-grid">
              {filtered.map((lecturer) => (
                <LecturerCard key={lecturer.id} lecturer={lecturer} onOpen={onOpenLecturer} onBook={onBook} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <strong>Ничего не найдено</strong>
              <p>Попробуйте изменить запрос или выбрать другую дисциплину.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
