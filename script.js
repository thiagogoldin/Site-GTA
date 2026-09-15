(function() {
    const output = document.getElementById("output")


    // DATA DEFINITIVA
    // 19 de novembro de 2026, às 00:00:00
    const referenceDate = new Date(2026, 10, 19, 0, 0, 0)


    function calculateRemainingTime(referenceDate, todayDate) {

        if(todayDate >= referenceDate) {
            return [0, 0, 0, 0, 0, 0]
        }


        let years = referenceDate.getFullYear() - todayDate.getFullYear()
        let months = referenceDate.getMonth() - todayDate.getMonth()

        if(months < 0) {
            years--
            months += 12
        }


        // Cria uma data depois de retirar anos e meses
        let dateAfterYearsMonths = new Date(
            todayDate.getFullYear() + years,
            todayDate.getMonth() + months,
            todayDate.getDate(),
            todayDate.getHours(),
            todayDate.getMinutes(),
            todayDate.getSeconds()
        )


        // Corrige caso o dia ainda não tenha chegado
        if(dateAfterYearsMonths > referenceDate) {
            months--

            if(months < 0) {
                years--
                months = 11
            }

            dateAfterYearsMonths = new Date(
                todayDate.getFullYear() + years,
                todayDate.getMonth() + months,
                todayDate.getDate(),
                todayDate.getHours(),
                todayDate.getMinutes(),
                todayDate.getSeconds()
            )
        }


        let remainingMilliseconds = referenceDate - dateAfterYearsMonths


        const ONE_SECOND = 1000
        const ONE_MINUTE = ONE_SECOND * 60
        const ONE_HOUR = ONE_MINUTE * 60
        const ONE_DAY = ONE_HOUR * 24


        let days = Math.floor(remainingMilliseconds / ONE_DAY)
        remainingMilliseconds %= ONE_DAY

        let hours = Math.floor(remainingMilliseconds / ONE_HOUR)
        remainingMilliseconds %= ONE_HOUR

        let minutes = Math.floor(remainingMilliseconds / ONE_MINUTE)
        remainingMilliseconds %= ONE_MINUTE

        let seconds = Math.floor(remainingMilliseconds / ONE_SECOND)


        return [years, months, days, hours, minutes, seconds]
    }


    function textBuilder(years, months, days, hours, minutes, seconds) {

        let result = []


        if(years) {
            result.push(`${years} ${years === 1 ? "ano" : "anos"}`)
        }

        if(months) {
            result.push(`${months} ${months === 1 ? "mês" : "meses"}`)
        }

        if(days) {
            result.push(`${days} ${days === 1 ? "dia" : "dias"}`)
        }

        if(hours) {
            result.push(`${hours} ${hours === 1 ? "hora" : "horas"}`)
        }

        if(minutes) {
            result.push(`${minutes} ${minutes === 1 ? "minuto" : "minutos"}`)
        }


        // Segundos sempre aparecem
        result.push(`${seconds} ${seconds === 1 ? "segundo" : "segundos"}`)


        if(result.length === 1) {
            return result[0]
        }


        let last = result.pop()

        return `${result.join(", ")} e ${last}`
    }


    function updateCountdown() {

        const todayDate = new Date()


        if(todayDate >= referenceDate) {
            output.textContent = "COMPLETADO"
            return
        }


        const remainingTime = calculateRemainingTime(
            referenceDate,
            todayDate
        )


        output.textContent = textBuilder(...remainingTime)
    }


    updateCountdown()

    setInterval(updateCountdown, 1000)

})()