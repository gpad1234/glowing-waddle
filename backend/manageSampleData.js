#!/usr/bin/env node

/**
 * Utility script to manage sample data
 * Usage: node manageSampleData.js [command]
 * Commands:
 *   load    - Load sample data into database
 *   clear   - Clear all data from database
 *   reset   - Clear and reload sample data
 *   export  - Export current data as JSON
 */

const db = require('./database');
const fs = require('fs');
const path = require('path');
const loadSampleData = require('./loadSampleData');

const command = process.argv[2] || 'help';

const clearAllData = () => {
  db.serialize(() => {
    console.log('Clearing all data...');
    db.run('DELETE FROM activities', (err) => {
      if (err) console.error('Error clearing activities:', err);
      else console.log('✓ Activities cleared');
    });
    db.run('DELETE FROM deals', (err) => {
      if (err) console.error('Error clearing deals:', err);
      else console.log('✓ Deals cleared');
    });
    db.run('DELETE FROM contacts', (err) => {
      if (err) console.error('Error clearing contacts:', err);
      else console.log('✓ Contacts cleared');
    });
    db.run('DELETE FROM customers', (err) => {
      if (err) console.error('Error clearing customers:', err);
      else console.log('✓ Customers cleared');
    });
  });
};

const exportData = () => {
  const data = {
    customers: [],
    contacts: [],
    deals: [],
    activities: [],
  };

  db.serialize(() => {
    db.all('SELECT * FROM customers', [], (err, rows) => {
      data.customers = rows || [];

      db.all('SELECT * FROM contacts', [], (err, rows) => {
        data.contacts = rows || [];

        db.all('SELECT * FROM deals', [], (err, rows) => {
          data.deals = rows || [];

          db.all('SELECT * FROM activities', [], (err, rows) => {
            data.activities = rows || [];

            const exportPath = path.join(__dirname, 'crm-data-export.json');
            fs.writeFileSync(exportPath, JSON.stringify(data, null, 2));
            console.log(`✅ Data exported to ${exportPath}`);
            console.log(`   - ${data.customers.length} customers`);
            console.log(`   - ${data.contacts.length} contacts`);
            console.log(`   - ${data.deals.length} deals`);
            console.log(`   - ${data.activities.length} activities`);
            process.exit(0);
          });
        });
      });
    });
  });
};

switch (command) {
  case 'load':
    console.log('Loading sample data...');
    loadSampleData();
    setTimeout(() => process.exit(0), 2000);
    break;

  case 'clear':
    console.log('Are you sure you want to clear ALL data? (yes/no)');
    process.stdin.once('data', (data) => {
      if (data.toString().trim().toLowerCase() === 'yes') {
        clearAllData();
        setTimeout(() => process.exit(0), 2000);
      } else {
        console.log('Cancelled.');
        process.exit(0);
      }
    });
    break;

  case 'reset':
    console.log('Resetting database (clearing and reloading sample data)...');
    clearAllData();
    setTimeout(() => {
      loadSampleData();
      setTimeout(() => process.exit(0), 2000);
    }, 1000);
    break;

  case 'export':
    exportData();
    break;

  default:
    console.log(`
CRM Data Management Utility

Usage: node manageSampleData.js [command]

Commands:
  load      Load sample data into database
  clear     Clear all data from database
  reset     Clear and reload sample data
  export    Export current data as JSON
  help      Show this help message
    `);
    process.exit(0);
}
