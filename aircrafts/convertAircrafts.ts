
import * as fs from 'fs';
import * as path from 'path';

const inputPath = path.join(__dirname, 'planes.dat');
const outputPath = path.join(__dirname, 'aircrafts.json');

// Read the .dat file
const datContent = fs.readFileSync(inputPath, 'utf-8');

// Parse lines
const lines = datContent.split(/\r?\n/).filter(line => line.trim().length > 0);

// Convert each line to an object
const planes = lines.map(line => {
	// Remove surrounding quotes and split by ","
	const parts = line.match(/"(.*?)"|([^,]+)/g)?.map(p => p.replace(/^"|"$/g, '')) || [];
	return {
		name: parts[0] || null,
		iata: parts[1] === '\\N' ? null : parts[1] || null,
		icao: parts[2] === '\\N' ? null : parts[2] || null,
	};
});

const filteredPlanes = planes.filter(plane => plane.icao !== null);

// Write to JSON file
fs.writeFileSync(outputPath, JSON.stringify(filteredPlanes, null, 2), 'utf-8');
console.log(`Converted ${filteredPlanes.length} aircraft entries to aircrafts.json`);