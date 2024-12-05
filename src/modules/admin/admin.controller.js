const autoBind = require("auto-bind");
const postService = require("../post/post.service");
const createHttpError = require("http-errors");
const postMessages = require("../post/post.message");
const fs = require("fs");
const path = require("path");
const userService = require("../user/user.service");
const userMessages = require("../user/user.messages");

class adminController {
  #postService;
  #userService;
  constructor() {
    autoBind(this);
    this.#postService = postService;
    this.#userService = userService;
  }

  // ایجاد آگهی توسط ادمین
  async createPost(req, res, next) {
    try {
      const { permissions } = req.admin;
      if (!permissions.includes("create-post")) {
        throw createHttpError(403, adminMessages.permissionCreatePost);
      }
      const {
        title,
        duration,
        price,
        origin,
        destination,
        departureDate,
        returnDate,
        transportType,
        capacity,
        insurance,
        tourStatus,
        tourNumber,
      } = req.body;
      const parsedDuration = JSON.parse(duration);
      const parsedDepartureDate = JSON.parse(departureDate);
      const parsedReturnDate = JSON.parse(returnDate);
      if (!req.file) {
        throw createHttpError(400, "فایل تصویر الزامی است.");
      }
      const postData = {
        image: req.file.path,
        title,
        duration: {
          days: parseInt(parsedDuration.days, 10) || 0,
          nights: parseInt(parsedDuration.nights, 10) || 0,
        },
        price: parseFloat(price) || 0,
        origin,
        destination,
        departureDate: {
          day: parseInt(parsedDepartureDate.day, 10) || 0,
          month: parseInt(parsedDepartureDate.month, 10) || 0,
          year: parseInt(parsedDepartureDate.year, 10) || 0,
        },
        returnDate: {
          day: parseInt(parsedReturnDate.day, 10) || 0,
          month: parseInt(parsedReturnDate.month, 10) || 0,
          year: parseInt(parsedReturnDate.year, 10) || 0,
        },
        transportType,
        capacity: parseInt(capacity, 10) || 0,
        insurance: insurance === "true",
        tourStatus,
        tourNumber,
      };
      await this.#postService.createPost(postData);
      return res.status(201).json({
        message: postMessages.craeted,
      });
    } catch (error) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("خطا در حذف تصویر:", err);
          }
        });
      }
      console.error("خطا در ایجاد پست:", error);
      next(error);
    }
  }

  // بروزرسانی آگهی توسط ادمین
  async updatePost(req, res, next) {
    try {
      const { permissions } = req.admin;
      if (!permissions.includes("update-post")) {
        throw createHttpError(403, adminMessages.permissionUpdatePost);
      }
      const { postId } = req.params;
      const {
        title,
        duration,
        price,
        origin,
        destination,
        departureDate,
        returnDate,
        transportType,
        capacity,
        insurance,
        tourStatus,
        tourNumber,
      } = req.body;
      const parsedDuration = JSON.parse(duration);
      const parsedDepartureDate = JSON.parse(departureDate);
      const parsedReturnDate = JSON.parse(returnDate);
      const existingPost = await this.#postService.getPostById(postId);
      if (!existingPost) {
        throw createHttpError(404, "پست پیدا نشد.");
      }
      if (req.file) {
        const oldImagePath = existingPost.image[0];
        console.log("مسیر تصویر قبلی:", oldImagePath);
        const imageName = path.basename(oldImagePath);
        const fullOldImagePath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "uploads",
          imageName
        );
        console.log("مسیر کامل تصویر قبلی:", fullOldImagePath);
        fs.access(fullOldImagePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error(
              "تصویر قبلی اصلا وجود نداره داداش:",
              fullOldImagePath
            );
          } else {
            fs.unlink(fullOldImagePath, (err) => {
              if (err) {
                console.error("خطا در حذف تصویر:", err);
              } else {
                console.log("تصویر قبلی با موفقیت پاک شد");
              }
            });
          }
        });
      }
      const updateData = {
        title,
        duration: {
          days: parseInt(parsedDuration.days, 10) || 0,
          nights: parseInt(parsedDuration.nights, 10) || 0,
        },
        price: parseFloat(price) || 0,
        origin,
        destination,
        departureDate: {
          day: parseInt(parsedDepartureDate.day, 10) || 0,
          month: parseInt(parsedDepartureDate.month, 10) || 0,
          year: parseInt(parsedDepartureDate.year, 10) || 0,
        },
        returnDate: {
          day: parseInt(parsedReturnDate.day, 10) || 0,
          month: parseInt(parsedReturnDate.month, 10) || 0,
          year: parseInt(parsedReturnDate.year, 10) || 0,
        },
        transportType,
        capacity: parseInt(capacity, 10) || 0,
        insurance: insurance === "true",
        tourStatus,
        tourNumber,
      };
      if (req.file) {
        updateData.image = [req.file.path];
      }
      const updatedPost = await this.#postService.updatePost(
        postId,
        updateData
      );
      return res.status(200).json({
        message: "پست با موفقیت به‌روزرسانی شد",
        post: updatedPost,
      });
    } catch (error) {
      console.error("خطا در به‌روزرسانی پست:", error);
      next(error);
    }
  }

  // حذف آگهی توسط ادمین
  async deletePost(req, res, next) {
    try {
      const { permissions } = req.admin;
      if (!permissions.includes("delete-post")) {
        throw createHttpError(403, adminMessages.permissionDeletePost);
      }
      const { postId } = req.params;
      const existingPost = await this.#postService.getPostById(postId);
      if (!existingPost) {
        throw createHttpError(404, "پست پیدا نشد.");
      }
      const oldImagePath = existingPost.image[0];
      console.log("Old image path:", oldImagePath);
      const imageName = path.basename(oldImagePath);
      const fullOldImagePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "uploads",
        imageName
      );
      fs.access(fullOldImagePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(fullOldImagePath, (err) => {
            if (err) {
              console.error("خطا در حذف تصویر", err);
            } else {
              console.log("تصویر قبلی با موفقیت پاک شد");
            }
          });
        } else {
          console.error("تصویر قبلی اصلا وجود نداشت:", fullOldImagePath);
        }
      });
      const deletedPost = await this.#postService.deletePost(postId);
      return res.status(200).json({
        message: postMessages.deleted,
      });
    } catch (error) {
      console.error("خطا در حذف پست:", error);
      next(error);
    }
  }

  // دریافت لیست کاربران همراه با دیتای هر کاربر
  async getAllUsers(req, res, next) {
    try {
      const { permissions } = req.admin;
      if (!permissions.includes("get_users"))
        throw new createHttpError(404, adminMessages.permissionGetUsers);
      const allUsers = await this.#userService.getAllUsers();
      return res.status(200).json({
        allUsers,
      });
    } catch (error) {
      next(error);
    }
  }

  // حذف کاربر توسط ادمین
  async deleteUser(req, res, next) {
    try {
      const { permissions } = req.admin;
      if (!permissions.includes("delete_user")) {
        throw new createHttpError(403, adminMessages.permissionGetUsers);
      }
      const { userId } = req.params;
      const message = await this.#userService.deleteUser(userId);
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new adminController();
