import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000,
});

export default limiter;
