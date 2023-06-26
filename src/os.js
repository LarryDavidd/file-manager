import os from 'os';

export const operatingSystemInfo = (command) => {
	try {
		switch (command) {
			case '--EOL':
				console.log(JSON.stringify(os.EOL))
				break;
			case '--cpus':
        console.log(`Overall amount of CPUS is ${os.cpus().length}\n`);
        const cpusArr = [];
        os.cpus().forEach((cpu) => {
          cpusArr.push({
						model: cpu.model,
						speedGHz: (cpu.speed / 1000).toFixed(2)
					})
        });
        console.table(cpusArr);
        break;
			case '--homedir':
				console.log(os.homedir());
				break;
			case '--username':
				console.log(os.userInfo().username);
				break;
			case '--architecture':
				console.log(os.arch());
				break;
			default:
				console.log('Invalid input');
				break;
		}
	} catch (err) {
		console.log('Operation failed');
	}
}