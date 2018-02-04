import axios from 'axios';

module.exports = axios.create({
    headers: {'X-CSRFToken': csrf_token}
});