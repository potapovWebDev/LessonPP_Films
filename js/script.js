/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */ 
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
        genre = document.querySelector('.promo__genre'),
        poster = document.querySelector('.promo__bg'),
        listRem = document.querySelector('.promo__interactive-list');

    const makeChanges = () => {
        genre.innerHTML = 'драма'
        poster.style.background = 'url(../img/bg.jpg) center center/cover no-repeat';
    };

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        })
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);
        films.forEach ((item, i) => {
            parent.innerHTML += ` <li class="promo__interactive-item">${i+1} - ${item}
                                        <div class="delete"></div>
                                    </li>`;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    };
 
    // -------------------------------------------------------------------------------------------------
    
    const addForm = document.querySelector('form.add'),
         addInput = addForm.querySelector('.adding__input'),
         checkbox = document.querySelector('input[type=checkbox]');
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorit = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            if (favorit) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm.toUpperCase());
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, listRem);
        }

        event.target.reset();
    });
    
    /* form.addEventListener('click', (e) => {
        e.preventDefault();
        
        let i = input.value;
        if (i.length > 21) {
            let ObrI = i.slice(0, 21) + '...';
            movieDB.movies.push(ObrI);
            movieDB.movies.sort();
            listRem.innerHTML = '';
            movieDB.movies.forEach ((item, i) => {
            listRem.innerHTML += ` <li class="promo__interactive-item">${i+1} - ${item}
                                    <div class="delete"></div>
                                </li>`;
            
            
            });
            
        } else if (i.length < 21) {
            movieDB.movies.push(i);
            movieDB.movies.sort();
            listRem.innerHTML = '';
            movieDB.movies.forEach ((item, i) => {
            listRem.innerHTML += ` <li class="promo__interactive-item">${i+1} - ${item}
                                    <div class="delete"></div>
                                </li>`;
            
            });
        }
        if (check.checked) {
            console.log('Добавляеться любимый фильм')
        }
        
    }); */

    
    createMovieList(movieDB.movies, listRem);
    deleteAdv(adv);
    makeChanges();
    
})














