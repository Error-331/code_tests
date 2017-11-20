'use strict';

// https://codility.com/
//
// Find how many families of three can occupy seats in one row

export default async () => {
    // not very accurate and not best solution
    const notVeryAccurateNotBestSolutionFunc = (function () {
        function parseOccupiedSeatsString(seatsString) {
            return seatsString.split(' ').reduce((parseOccupiedSeats, seatString) => {
                if (seatString.length < 2) {
                    return parseOccupiedSeats;
                }

                const seatColumn = seatString.charAt(1).toLowerCase();
                const seatRow = seatString.charAt(0);

                parseOccupiedSeats[seatRow] = parseOccupiedSeats[seatRow] || [];
                parseOccupiedSeats[seatRow].push(seatColumn);

                return parseOccupiedSeats;
            }, {})
        }

        function findIntersection(firstElements, secondElements) {
            const intersectedElements = [];
            const firstElementsLength = firstElements.length;

            for(let firstElementsCounter = 0; firstElementsCounter < firstElementsLength; firstElementsCounter++) {
                secondElements.findIndex(element => element === firstElements[firstElementsCounter]) !== -1 ? intersectedElements.push(firstElements[firstElementsCounter]) : null;
            }

            return intersectedElements;
        }

        return function(numberOfRows, occupiedSeats) {
            const parsedOccupiedSeats = parseOccupiedSeatsString(occupiedSeats);
            let totalAvailableSeatsForFamilies = 0;

            for (let rowCounter = 1; rowCounter <= numberOfRows; rowCounter++) {
                let availableSeatsForFamily = 3;

                if (!parsedOccupiedSeats[rowCounter]) {
                    totalAvailableSeatsForFamilies += availableSeatsForFamily;
                    continue;
                }

                availableSeatsForFamily = findIntersection(['a', 'b', 'c'], parsedOccupiedSeats[rowCounter]).length > 0 ? availableSeatsForFamily - 1 : availableSeatsForFamily;
                availableSeatsForFamily = findIntersection(['h', 'j', 'k'], parsedOccupiedSeats[rowCounter]).length > 0 ? availableSeatsForFamily - 1 : availableSeatsForFamily;

                const middleSeatsIntersection = findIntersection(['d', 'e', 'f', 'g'], parsedOccupiedSeats[rowCounter]);
                const middleSeatsIntersectionLength = middleSeatsIntersection.length;

                if (middleSeatsIntersectionLength >= 2) {
                    availableSeatsForFamily = availableSeatsForFamily - 1;
                } else if (middleSeatsIntersectionLength === 1) {
                    availableSeatsForFamily = findIntersection(['e', 'f'], parsedOccupiedSeats[rowCounter]).length > 0 ? availableSeatsForFamily - 1 : availableSeatsForFamily;
                }

                totalAvailableSeatsForFamilies += availableSeatsForFamily;
            }

            return totalAvailableSeatsForFamilies;
        }

    }());

    console.log('Passenger seats for families of three');
    console.log('=====================================');
    console.log('');

    console.log('Not very accurate and not best solution...');
    console.log('');

    console.log('Total rows - 2, occupied seats - 1A 2F 1C 2A 1F 2K, available seats for families:', notVeryAccurateNotBestSolutionFunc(2, '1A 2F 1C 2A 1F 2K'));
    console.log('Total rows - 2, occupied seats - 1A 2F 1C 2A 1G 2K, available seats for families:', notVeryAccurateNotBestSolutionFunc(2, '1A 2F 1C 2A 1G 2K'));
    console.log('Total rows - 2, occupied seats - 1A 2F 1C, available seats for families:', notVeryAccurateNotBestSolutionFunc(2, '1A 2F 1C'));
    console.log('Total rows - 3, occupied seats - 2F, available seats for families:', notVeryAccurateNotBestSolutionFunc(3, '2F'));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}