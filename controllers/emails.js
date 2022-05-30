const Email = require('../models/email');


// here i am returning only the numbers of email for the speed on loading the home page
// in a small scale it wont matter but on the larger scale i dont want to load unnecessary info
module.exports.index = async (req, res) => {
    try {
        const emails = await Email.find({});
        const noE = emails.length
        res.json({
            success: true,
            noE: noE,
            message: "Loaded all emails"
        })
    } catch (err) {
        res.json({
            success: false,
            message: err
        })
    }
};

// get the list of the emails
module.exports.mailList = async (req, res) => {
    try {
        const emails = await Email.find({});
        res.json({
            success: true,
            emails: emails,
            message: "Loaded all emails"
        })
    } catch (err) {
        res.json({
            success: false,
            message: err
        })
    }
};

// create an email on subject is required
module.exports.createEmail = async (req, res) => {
    try {
        const email = new Email(req.body);
        email.isRead = false;
        await email.save()
        res.json({
            success: true,
            message: "created new email"
        })
    } catch (err) {
        res.json({
            success: false,
            message: err
        })
    }
};

// get one single email
module.exports.showEmail = async (req, res) => {
    try{
        let email = await Email.findOneAndUpdate({ _id: req.params.id}, {
            $set: {
                isRead: true
            }
        });
        console.log(email)
        if (email){
            await email.save();
            res.json({
                success: true,
                email: email,
                message: "email found"
              })
        } else {
            res.json({
                success: false,
                message: "email not found found"
              })  
        }
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            message: err
          })
    }
}
// delete an email
module.exports.deleteEmail = async (req, res, next) => {
    try {
        let deleteEmail = await Email.findOneAndDelete({
            _id: req.params.id
        });
        if (deleteEmail) {
            res.status(200).json({
                success: true,
                message: "Successfully deleted email!"
            })
        } else {
            res.status(500).json({
                success: false,
                message: "mail not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
// update an email, i just left the update for the crud example although i don't think any UX might need that but anyway ... 
module.exports.updateEmail = async (req, res, next) => {
    try {
        let email = await Email.findOneAndUpdate({ _id: req.params.id}, {
            $set: {
                subject: req.body.subject,
                content: req.body.content
            }
        });
        if(email){
            res.status(200).json({
                success: true,
                message: 'email updated'
              })
        } else {
            res.status(500).json({
                success: false,
                message: 'email not found'
              })  
        }
        await email.save();
    } catch (err){
        res.status(500).json({
            success: false,
            message: err.message
          })
    }
}

