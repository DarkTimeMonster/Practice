using Microsoft.AspNetCore.Mvc;
using Domain;

namespace DaviskibaMaksim.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();

        public IActionResult SiteInformation() => View();

        [HttpPost]
        public IActionResult Contact(ContactDto dto)
        {
            // TODO: сохранить/отправить сообщение через Service/DAL
            // Пока: показать сообщение благодарности
            TempData["MessageSent"] = "Спасибо! Мы получили ваше сообщение.";
            return RedirectToAction(nameof(SiteInformation));
        }

        [HttpPost]
        public IActionResult Login(LoginDto dto)
        {
            // TODO: аутентификация через Service
            TempData["Auth"] = "Вход (тестовый) выполнен.";
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public IActionResult Register(RegisterDto dto)
        {
            // TODO: регистрация через Service
            TempData["Auth"] = "Регистрация (тестовая) выполнена.";
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public IActionResult SendMessage(ContactDto dto)
        {
            // TODO: логика отправки письма
            TempData["MessageSent"] = "Спасибо! Сообщение отправлено.";
            return RedirectToAction(nameof(SiteInformation));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = System.Diagnostics.Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}