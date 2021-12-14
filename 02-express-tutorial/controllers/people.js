let data = require('../data.js');

const getPeople = (req, res) => {
    res.status(200).json({
        success: true,
        data: data.people
    });
}

const postPeople = (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    if (name) {
        res.status(201).json({
            success: true,
            name: name
        });
        return res.end();
    } else {
        res.status(400).json({
            success: false,
            message: 'Name not provided'
        });
        return res.end();
    }    
}

const putPeople = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    // console.log(id);
    // console.log(name);

    // const targetObj = data.people.find((obj) => {
    //     if (obj.id === Number(id)) return obj;
    // });

    const targetObj = data.people.find(obj => obj.id === Number(id));

    if (name && targetObj) {
        const oldName = targetObj.name;
        targetObj.name = name;        
        res.status(201).json({
            success: true,
            name: targetObj.name,
            oldName: oldName
        });
        return res.end();
    } else {
        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Name not provided'
            });
            return res.end();
        }

        if (!targetObj) {
            res.status(404).json({
                success: false,
                message: 'targetObj not found'
            });
            return res.end();
        }
    }    
}

const deletePeople = (req, res) => {
    const { id } = req.params;
    
    const targetObj = data.people.find((obj) => obj.id === Number(id));
    if (targetObj) {
        data.people = data.people.filter(obj => obj.id != Number(id));
        res.status(200).json({
            success: true            
        });
        return res.end();    
    } else {
        res.status(404).json({
            success: false,
            message: 'targetObj not found'
        });
        return res.end();
    }
}

module.exports = { getPeople, postPeople, putPeople, deletePeople };