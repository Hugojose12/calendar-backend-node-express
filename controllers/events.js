const { response } = require('express');
const User = require('../models/User');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

    const events = await Event.find().populate('user','name');

    res.json({
        ok: true,
        events: events
    })
}

const createEvent = async(req, res = response) => {

    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const eventSave = await event.save();

        res.json({
            ok: true,
            event: eventSave
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'An error has occurred contact support'
        });
    }
}

const updateEvent = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventoId);

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'ID does not exist for an event'
            });
        }

        if( event.user.toString() !== uid ) {
            return  res.status(401).json({
                ok: false,
                msg: 'You do not have permissions to perform that action'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid 
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventoId, newEvent, {new: true});

        res.json({
            ok: true,
            event: eventUpdated
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'An error has occurred contact support'
        });
    }

    res.json({
        ok: true,
        msg: 'updateEvent'
    });
}

const deleteEvent = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventoId);

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'ID does not exist for an event'
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permissions to perform that action'
            })
        }

        await Event.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: 'Event removed'
        })
        
    } catch (error) {
        console.log(error);
        es.status(500).json({
            ok: false,
            msg: 'An error has occurred contact support'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}