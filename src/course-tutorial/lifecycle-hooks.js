export const options = {
    vus: 5,
    iterations: 10
};

export function setup() {
  console.log("------ set-up --------");
}

export default function (data) {
    console.log("------ default fn --------");
}

export function teardown(data) {
    console.log("------ tear-down --------");
}