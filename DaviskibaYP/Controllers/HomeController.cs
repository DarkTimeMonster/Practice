using Microsoft.AspNetCore.Mvc;
using DaviskibaYP.Services;

namespace DaviskibaYP.Controllers
{
    public class HomeController : Controller
    {
        private readonly ContactService _contactService;

        public HomeController()
        {
            _contactService = new ContactService();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult SiteInformation()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken] // опционально, но правильно
        public IActionResult SendMessage(string Name, string Email, string Message)
        {
            try
            {
                _contactService.SubmitMessage(Name, Email, Message);
                TempData["Success"] = $"Спасибо, {Name}! Ваше сообщение успешно отправлено.";
            }
            catch (Exception ex)
            {
                TempData["Error"] = $"Ошибка: {ex.Message}";
            }

            // ?? Возвращаемся на главную и сразу в секцию #message
            return Redirect("/Home/Index#message");
        }

    }
}