const http = require('http');

http.get('http://localhost:5001/api/categories', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Categories from API:', data);
        process.exit();
    });
}).on('error', (err) => {
    console.error('Error fetching categories:', err.message);
    process.exit(1);
});
