import React from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css'

function TeacherList() {

    const [ teachers, setTeachers ] = useState([]);

    const [ subject, setSubject] = useState('');
    const [ week_day, setWeekDay] = useState('');
    const [ time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();
        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        label="Matéria" 
                        name="subject"
                        value = {subject}
                        onChange = { e => { setSubject(e.target.value) } }
                        options={[
                            { value: 'Artes', label: 'Artes'},
                            { value: 'Biologia', label: 'Biologia'},
                            { value: 'Matemática', label: 'Matemática'},
                            { value: 'Física', label: 'Física'},
                            { value: 'Química', label: 'Química'},
                            { value: 'Literatura', label: 'Literatura'},
                            { value: 'Educação física', label: 'Educação física'},
                        ]}
                    />
                    <Select 
                        label="Dia da semana" 
                        name="week-day"
                        value = {week_day}
                        onChange = { e => { setWeekDay(e.target.value) } }
                        options={[
                            { value: '0', label: 'Domingo'},
                            { value: '1', label: 'Segunda-feira'},
                            { value: '2', label: 'Terça-feira'},
                            { value: '3', label: 'Quarta-feira'},
                            { value: '4', label: 'Quinta-feira'},
                            { value: '5', label: 'Sexta-feira'},
                            { value: '6', label: 'Sábado'},
                        ]}
                    />
                    <Input 
                        label="Hora" name="time" type="time"
                        value = {time}
                        onChange = { e => { setTime(e.target.value) } }
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>
            <main>  
                { teachers.map((teacher : Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={ teacher }/>;
                }) }
            </main>
        </div>
    );
}

export default TeacherList;