let interviewList = [];
let rejectedList = [];
let currentStatus = "";

if (interviewList.length) {
    document.getElementById("noJob-section").classList.remove("hidden")
}


// all main div here
const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");
const noJobSection = document.getElementById("noJob-section")


// all filter btn here
const allFilterBtn = document.getElementById("all-filter-btn")
const interviewFilterBtn = document.getElementById("interview-filter-btn")
const rejectedFilterBtn = document.getElementById("rejected-filter-btn")


// total জবের সংখ্যা বের করা হয়েছে
const totalJobs = document.getElementById("totalJobs");
const total = document.getElementById("total");

//all count here
const interviewCount = document.getElementById("Interview")
const rejectedCount = document.getElementById("Rejected")

function calculateTotal() {
    // total.innerText = allCardSection.children.length;
    // totalJobs.innerText = allCardSection.children.length;
    const totalAllJobs = allCardSection.children.length;

    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    // ======== Dynamic job text ==========//
    if (currentStatus === "interview-filter-btn") {
        if (interviewList.length === 0) {
            totalJobs.innerText = "0";
        } else {
            totalJobs.innerText = interviewList.length + " of " + totalAllJobs;
        }
    } else if (currentStatus === "rejected-filter-btn") {
        if (rejectedList.length === 0) {
            totalJobs.innerText = "0"
        } else {
            totalJobs.innerText = rejectedList.length + " of " + totalAllJobs;
        }
    }
    else {
        totalJobs.innerText = totalAllJobs;
    }
    total.innerText = totalAllJobs;
}
calculateTotal()


function toggleStyle(id) {
    currentStatus = id;


    allFilterBtn.classList.remove("bg-blue-500", "text-white");
    interviewFilterBtn.classList.remove("bg-blue-500", "text-white");
    rejectedFilterBtn.classList.remove("bg-blue-500", "text-white");

    allFilterBtn.classList.add("bg-gray-300", "text-black");
    interviewFilterBtn.classList.add("bg-gray-300", "text-black");
    rejectedFilterBtn.classList.add("bg-gray-300", "text-black");

    const selected = document.getElementById(id);
    selected.classList.remove("bg-gray-300", "text-black");
    selected.classList.add("bg-blue-500", "text-white");

    if (id === "interview-filter-btn") {
        allCardSection.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderInterview();
    } else if (id === "all-filter-btn") {
        allCardSection.classList.remove("hidden");
        filterSection.classList.add("hidden");
        noJobSection.classList.add("hidden")
    } else if (id === "rejected-filter-btn") {
        allCardSection.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderRejected();
    }

    calculateTotal()

}


// এখন ইভেন্ট ডেলিগেশন করতে হবে

mainContainer.addEventListener('click', function (event) {


    if (event.target.classList.contains("interview-btn")) {
        const parentNode = event.target.parentNode.parentNode.parentNode;

        const jobName = parentNode.querySelector(".jobName").innerText;
        const jobtype = parentNode.querySelector(".jobtype").innerText;
        const jobSalary = parentNode.querySelector(".jobSalary").innerText;
        const jobStatus = parentNode.querySelector(".jobStatus").innerText;
        const JobNote = parentNode.querySelector(".JobNote").innerText;

        const cardInfo = {
            jobName,
            jobtype,
            jobSalary,
            jobStatus,
            JobNote
        }

        parentNode.querySelector(".jobStatus").innerText = "Interview";
        const interviewExit = interviewList.find(item => item.jobName === cardInfo.jobName);

        if (!interviewExit) {
            interviewList.push(cardInfo);
        }



        rejectedList = rejectedList.filter(item => item.jobName !== cardInfo.jobName)

        if (currentStatus === "rejected-filter-btn") {
            renderRejected()
        }

        calculateTotal()
    } else if (event.target.classList.contains("rejected-btn")) {
        const parentNode = event.target.parentNode.parentNode.parentNode;

        const jobName = parentNode.querySelector(".jobName").innerText;
        const jobtype = parentNode.querySelector(".jobtype").innerText;
        const jobSalary = parentNode.querySelector(".jobSalary").innerText;
        const jobStatus = parentNode.querySelector(".jobStatus").innerText;
        const JobNote = parentNode.querySelector(".JobNote").innerText;

        const cardInfo = {
            jobName,
            jobtype,
            jobSalary,
            jobStatus: 'Rejected',
            JobNote
        }

        parentNode.querySelector(".jobStatus").innerText = "Rejected";
        const rejectedExit = rejectedList.find(item => item.jobName === cardInfo.jobName);

        if (!rejectedExit) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.jobName !== cardInfo.jobName)

        if (currentStatus === "interview-filter-btn") {
            renderInterview()
        }
        calculateTotal()
    } else if (event.target.classList.contains("delete-btn")) {
        const parentNode = event.target.parentNode.parentNode.parentNode;
        const jobName = parentNode.querySelector(".jobName").innerText;

        parentNode.remove();

        // remove from interviewList 
        interviewList = interviewList.filter(item => item.jobName !== jobName)

        // remove from rejectedList 


        if (currentStatus === "interview-filter-btn") {
            renderInterview()
        } else if (currentStatus === "rejected-filter-btn") {
            renderRejected()
        }


        calculateTotal()
    }

})



// এখন render করতে হবে

function renderInterview() {
    filterSection.innerHTML = "";

    if (interviewList.length === 0 || allCardSection.length === 0) {
        noJobSection.classList.remove("hidden")
    } else {
        noJobSection.classList.add("hidden")
    }
    

    for (let interview of interviewList || allCardSection.length === 0) {
        const div = document.createElement("div");
        div.className = "cardBox p-6 shadow-md flex justify-between border-2 border-gray-200 rounded-[10px] mt-7";
        div.innerHTML = `
            <div class="left space-y-2">
                    <h3 class="jobName text-3xl font-medium">${interview.jobName}</h3>
                    <p class="jobtype text-gray-400 font-medium text-[1.3rem] mb-5">${interview.jobtype}</p>
                    <div class="mb-6">
                        <span class="jobSalary text-gray-400 rounded-[10px]">${interview.jobSalary}</span>
                    </div>
                    <p class="jobStatus py-2 px-3 w-[140px] text-center rounded-[10px] bg-[#EEF4FF] w- ">Interview
                    </p>
                    <p class="JobNote text-gray-500">${interview.JobNote}</p>
                    <div class="mt-6">
                        <button class="interview-btn btn border-[green] mr-3 text-[green]">interview</button>
                        <button class="rejected-btn btn border-[red] text-[red]">Rejected</button>
                    </div>
            </div>
            <div class="right">
                    <div class="border p-3 rounded-full"><i class="fa-regular fa-trash-can"></i></div>
            </div>
        `
        filterSection.appendChild(div)
    }
}




function renderRejected() {
    filterSection.innerHTML = "";

    if (rejectedList.length === 0) {
        noJobSection.classList.remove("hidden")
    } else {
        noJobSection.classList.add("hidden")
    }





    for (let rejected of rejectedList) {
        const div = document.createElement("div");
        div.className = "cardBox p-6 shadow-md flex justify-between border-2 border-gray-200 rounded-[10px] mt-7";
        div.innerHTML = `
            <div class="left space-y-2">
                    <h3 class="jobName text-3xl font-medium">${rejected.jobName}</h3>
                    <p class="jobtype text-gray-400 font-medium text-[1.3rem] mb-5">${rejected.jobtype}</p>
                    <div class="mb-6">
                        <span class="jobSalary text-gray-400 rounded-[10px]">${rejected.jobSalary}</span>
                    </div>
                    <p class="jobStatus py-2 px-3 w-[140px] text-center rounded-[10px] bg-[#EEF4FF] w- ">Rejected
                    </p>
                    <p class="JobNote text-gray-500">${rejected.JobNote}</p>
                    <div class="mt-6">
                        <button class="interview-btn btn border-[green] mr-3 text-[green]">interview</button>
                        <button class="rejected-btn btn border-[red] text-[red]">Rejected</button>
                    </div>
            </div>
            <div class="right">
                    <div class="border p-3 rounded-full"><i class="fa-regular fa-trash-can"></i></div>
            </div>
        `
        filterSection.appendChild(div)
    }
}















