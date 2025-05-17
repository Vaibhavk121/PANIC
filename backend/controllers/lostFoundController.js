const LostFound = require('../models/LostFound');
const { validationResult } = require('express-validator');

// @desc    Report a lost or found person
// @route   POST /api/lostfound
// @access  Private
exports.reportPerson = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { 
      name, 
      age, 
      gender, 
      status, 
      description, 
      latitude, 
      longitude, 
      contactInfo,
      imageUrl 
    } = req.body;

    const report = new LostFound({
      name,
      age,
      gender,
      status,
      description,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude] // GeoJSON uses [longitude, latitude] order
      },
      reporterId: req.user._id,
      contactInfo,
      imageUrl
    });

    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all lost and found reports with optional filtering
// @route   GET /api/lostfound
// @access  Public
exports.getReports = async (req, res) => {
  try {
    const { status, name, resolved } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    
    if (resolved !== undefined) {
      filter.resolved = resolved === 'true';
    }
    
    const reports = await LostFound.find(filter)
      .sort({ createdAt: -1 })
      .populate('reporterId', 'name email phone');
      
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a specific report by ID
// @route   GET /api/lostfound/:id
// @access  Public
exports.getReportById = async (req, res) => {
  try {
    const report = await LostFound.findById(req.params.id)
      .populate('reporterId', 'name email phone');
      
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a report (mark as resolved)
// @route   PUT /api/lostfound/:id
// @access  Private
exports.updateReport = async (req, res) => {
  try {
    const report = await LostFound.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    // Check if user is the reporter
    if (report.reporterId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this report' });
    }
    
    const { resolved, additionalInfo } = req.body;
    
    if (resolved !== undefined) {
      report.resolved = resolved;
    }
    
    if (additionalInfo) {
      report.description = `${report.description}\n\nUpdate: ${additionalInfo}`;
    }
    
    const updatedReport = await report.save();
    res.json(updatedReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};