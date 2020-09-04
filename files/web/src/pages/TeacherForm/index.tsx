import React from 'react';
import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {

    const history = useHistory();

    const [ scheduleItems, setScheduleItems ] = useState([
        {week_day: 0, from: '', to: ''}
    ]);

    function addNewScheduleItem (){
        setScheduleItems([
            ...scheduleItems, 
            { week_day: 0, from: '', to: '' }
        ]);
    }

    const [ name, setName ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ cost, setCost ] = useState('');

    function handleCreateClass(e: FormEvent){
        e.preventDefault();
        api.post('/classes', {
            "name": name,
            "avatar": avatar,
            "whatsapp": whatsapp,
            "bio": bio,
            "subject": subject,
            "cost": Number(cost),
            "schedule": scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro!')
        });
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if(index === position){
                return ({ ...scheduleItem, [field]: value });
            }
            return scheduleItem;
        });
        setScheduleItems(newArray);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher este formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            label="Nome completo" name="name"
                            value = {name}
                            onChange={(e) => { setName(e.target.value) } }    
                            />
                        <Input 
                            label="Avatar" name="avatar"
                            value = {avatar}
                            onChange={(e) => { setAvatar(e.target.value) } }    
                        />
                        <Input 
                            label="WhatsApp" name="whatsapp"
                            value = {whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) } }    
                        />
                        <Textarea 
                            label="Biografia" name="bio"
                            value = {bio}
                            onChange={(e) => { setBio(e.target.value) } }    
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            label="Matéria" 
                            name="subject"
                            value = {subject}
                            onChange = { (e) => {setSubject(e.target.value)} }
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
                        <Input 
                            label="Custo da sua hora por aula" name="cost"
                            value = {cost}
                            onChange = { (e) => {setCost(e.target.value)} }
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={ scheduleItem.week_day } className="schedule-item">
                                    <Select 
                                        label="Dia da semana" 
                                        name="week-day"
                                        value = {scheduleItem.week_day}
                                        onChange={ e => setScheduleItemValue(index, 'week_day', e.target.value) }
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
                                        label="Das" name="from" type="time"
                                        value = {scheduleItem.from}
                                        onChange={ e => setScheduleItemValue(index, 'from', e.target.value) }
                                    />
                                    <Input 
                                        label="Até" name="to" type="time"
                                        value = {scheduleItem.to}
                                        onChange={ e => setScheduleItemValue(index, 'to', e.target.value) }
                                    />
                                </div>
                            );
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;